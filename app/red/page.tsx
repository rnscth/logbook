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
  description: 'Red Orders',
}

const inter = Inter({ subsets: ['latin']})


export default function OrdersList() {

  const {setHeaderTitle, checkSession, redOrdersRoute, getOrders} = useContext(UserContext);

  useEffect(() => {
    checkSession();
    setHeaderTitle(`Red Orders List`)
    getOrders(redOrdersRoute);
  }, []);

  return (
    <div className={inter.className}>
      <OrdersTable ordersRoute={redOrdersRoute}/>
    </div>
  );
}
