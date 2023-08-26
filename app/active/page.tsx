'use client'
import React from 'react'
import { Metadata } from 'next'
import { useEffect} from 'react';
import {Inter} from 'next/font/google'
import { useContext } from 'react';
import { UserContext } from '../userContext';
import OrdersTable from '../components/ordersTable';

export const metadata: Metadata = {
  title: 'Logbook/Active',
  description: 'Active Orders List',
}

const inter = Inter({ subsets: ['latin']})


export default function OrdersList() {

  const {setHeaderTitle, checkSession, activeOrdersRoute, getOrders} = useContext(UserContext);


  useEffect(() => {
    checkSession();
    setHeaderTitle(`Active Orders List`)
    getOrders(activeOrdersRoute);
  }, []);

  return (
    <div className={inter.className}>
      <OrdersTable ordersRoute={activeOrdersRoute}/>
    </div>
  );
}
