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
  description: 'Active Orders',
}

const inter = Inter({ subsets: ['latin']})


export default function OrdersList() {
  //@ts-ignore
  const {setHeaderTitle, checkSession, activeOrdersRoute, getOrders} = useContext(UserContext);


  useEffect(() => {
    checkSession();
    setHeaderTitle(`Active Orders List`)
    getOrders(activeOrdersRoute);
  }, []);

  return (
    <div className={inter.className}>
      <OrdersTable route={activeOrdersRoute}/>
    </div>
  );
}
