'use client'
import React from 'react'
import { useEffect} from 'react';
import axios from 'axios'
import {Inter} from 'next/font/google'
import { useContext } from 'react';
import { UserContext } from '../userContext';
import { Metadata } from 'next'
import OrdersTable from '../components/ordersTable';

export const metadata: Metadata = {
  title: 'Logbook',
  description: 'Reject Orders',
}

const inter = Inter({ subsets: ['latin']})


export default function OrdersList() {
  //@ts-ignore
  const {setHeaderTitle, authTokens, checkSession, rejectOrdersRoute, setOrders} = useContext(UserContext);

  const getOrders = async () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + authTokens.access  
      }
    };
    try {
      const response = await axios.get(rejectOrdersRoute, config );
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    checkSession();
    setHeaderTitle(`Reject Orders List`)
    getOrders();
  }, []);

  return (
    <div className={inter.className}>
      <OrdersTable ordersRoute={rejectOrdersRoute}/>
    </div>
  );
}
