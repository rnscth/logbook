'use client'
import { useEffect, useState, createContext } from "react";
import React from "react";
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/navigation';
import axios from "axios";
import { toast } from "react-toastify";

export const UserContext = createContext<any | undefined>(undefined);

export const UserProvider = ({ children } : { children: React.ReactNode })=> {
  
  let router = useRouter();  
  let [authTokens, setAuthTokens] = useState(() => {
    const storedTokens = localStorage.getItem('authTokens');
    if (storedTokens) {
        return JSON.parse(storedTokens);
    }
    return null;
});
  let [user, setUser] = useState(() => {
    const authToken = localStorage.getItem('authTokens');
    if (authToken) {
        return jwtDecode(authToken);
    }
    return null;
});
  let [headerTitle, setHeaderTitle] = useState('Active Orders list')
  let [welcomeMsj, setWelcomeMsj] = useState(false)
  let [orders, setOrders] = useState([]);

  const apiRoot = "http://localhost:8000/"
  const apiRoute = `${apiRoot}orders/`
  const apiTokenRoute = `${apiRoot}jwtoken/token/`
  const activeOrdersRoute = `${apiRoute}active/`
  const redOrdersRoute = `${apiRoute}red/`
  const completeOrdersRoute = `${apiRoute}complete/`
  const rejectOrdersRoute = `${apiRoute}reject/`
  
  let logoutUser = () => {
    localStorage.removeItem('authTokens');
    setAuthTokens(null);
    setUser(null);
    router.push('/login');
    setWelcomeMsj(false);
  }

  async function login(username: any, password: any){
    try {
      const response = await axios.post(apiTokenRoute, { 
        'username': username, 
        'password': password, 
      });
      if (response.status === 200){
        toast.success(`Loged successfuly!`);
        localStorage.setItem('authTokens',JSON.stringify(response.data))
        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access));
        setWelcomeMsj(true);
        router.push('/active');
      }
    } catch (error) {
      toast.error('Wrong credentials');
      console.error('Error fetching data:', error);
      setWelcomeMsj(false);
    }
  }

  let getOrders = async (route : string) => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + authTokens.access  
      }
    };
    try {
      const response = await axios.get(route, config );
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  let updateToken = async () => {
    try {
      let response = await axios.post(`${apiTokenRoute}refresh/`, { 'refresh': authTokens.refresh })
      let data = await response.data;
      if (response.status === 200) {
        console.log('update token');
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        setWelcomeMsj(true);
        localStorage.setItem('authTokens', JSON.stringify(data));
      } 
    } catch (error) {
      console.error('Error updating token:', error);
      logoutUser();
      console.log('update token failed');
    }
  }


  useEffect(()=> {
    let interval = setInterval(() => {
      if(authTokens){
        updateToken();
      }
    }, 200000)
    return ()=> clearInterval(interval)
  }, [authTokens])
    
  let checkSession = () => {
    if (!user) {
      toast.warn('Please log in to continue')
      router.push('/login')
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('authTokens')){
      router.push('/login');
      setWelcomeMsj(false)
    } else {
      console.log('updating token on refresh')
      updateToken()
      setWelcomeMsj(true)
    }
  }, []);

  let context = { 
    checkSession : checkSession,
    activeOrdersRoute : activeOrdersRoute,
    welcomeMsj : welcomeMsj,
    user : user,
    login: login, 
    setUser : setUser,
    headerTitle: headerTitle, 
    setHeaderTitle : setHeaderTitle,
    apiRoute : apiRoute,
    apiTokenRoute : apiTokenRoute,
    logoutUser : logoutUser,
    authTokens : authTokens,
    redOrdersRoute : redOrdersRoute,
    rejectOrdersRoute : rejectOrdersRoute, 
    completeOrdersRoute : completeOrdersRoute,
    orders : orders,
    setOrders : setOrders,
    getOrders : getOrders,
  }

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  );
};