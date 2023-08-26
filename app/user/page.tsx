'use client'
import React from 'react'
import { useEffect} from 'react';
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

  const {setHeaderTitle, checkSession, getOrders, apiRoute, user} = useContext(UserContext);
  var userRoute = `${apiRoute}user/${user.user_id}/`


  useEffect(() => {
    checkSession();
    setHeaderTitle(`User Orders List`)
    getOrders(userRoute);
  }, []);

  return (
    <div className={inter.className}>
      <OrdersTable ordersRoute={userRoute}/>
    </div>
  );
}

