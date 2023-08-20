'use client'
import React from 'react'
import { useEffect, useState} from 'react';
import axios from 'axios'
import styles from './styles.module.css'
import {Inter} from 'next/font/google'
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../userContext';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Logbook',
  description: 'User Orders',
}

const inter = Inter({ subsets: ['latin']})


export default function Page() {
  //@ts-ignore
  const { user, setHeaderTitle, authTokens, checkSession, apiRoute  } = useContext(UserContext);
  const [orders, setOrders] = useState<any[]>([]);

  const getOrders = async () => {
    let config = {
      headers: {
        'Authorization': 'Bearer ' + authTokens.access  
      }
    };
    try {
      const response = await axios.get(`${apiRoute}user/${user.user_id}/`, config );
      setOrders(response.data);
      setHeaderTitle(`User Orders List`)
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    checkSession()
    getOrders();
  }, []);

  function assignBtn(dhra: { username: string; }, order_number: string){  
    async function handleAssign(order_number: string){
      var date = new Date();
      let assignOrder = {
        user_id : user.user_id,
        date : date.toISOString(),
      }
      console.log(assignOrder);
      try {const response = await axios.put(`${apiRoute}order/assign/${order_number}/`, assignOrder);
      toast.success(`Order ${order_number} assigned successfully`);
      getOrders();
      } catch (error) {
        // @ts-ignore
        if (error.response.data.error = 'Already assigned') {
        toast.warn(`Order ${order_number} already assigned`);
        }else {
          toast.warn('Assign error')
        }
      }
    }
  if (dhra) {
    return <th className={styles.th}>{dhra.username.toUpperCase()}</th>
    } else {
      return (
        <th className={styles.th}><button
          title="Assign"
          className={styles.assignBtn}
          onClick={() => handleAssign(order_number)}
        >
          <img src="/usercheck.png" height="25" width="25" alt="usercheck" />
        </button></th>
      );
    }
  }

  function fromISOtoDate(date: string){
    if(date){
    var newDate = new Date (date);
    return (<th>{newDate.toLocaleDateString()},{newDate.toLocaleTimeString()}</th>) 
    } else {
      return(<th></th>)
    }
  }

  return (<div className={inter.className}>
    <section className={styles.ordersListContent}>
      <table className={styles.ordersTable}>
        <thead className={styles.tableHeader}>
          <tr>
            <th className={styles.th}>Order</th>
            <th className={styles.th}>Date</th>
            <th className={styles.th}>Hour</th>
            <th className={styles.th}>P/N</th>
            <th className={styles.th}>Batch</th>
            <th className={styles.th}>Description</th>
            <th className={styles.th}>QTY</th>
            <th className={styles.th}>DHRA</th>
            <th className={styles.th}>Updated</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {orders.map((order) => (
            <tr className={styles.tr} key={order.id}>
              <th className={styles.th}>
                <div className={styles.orderbtn}>
                  <div className={styles.statusBox}
                  style={{
                    backgroundColor: order.status.color,
                  }}/>
                  <div className={styles.orderNumber}>
                    <Link className={styles.link} href={`/displayOrder/${order.number}`}>{order.number}</Link>
                    </div>
                </div>
              </th>
              <th className={styles.th}>{order.date}</th>
              <th className={styles.th}>{order.hour}</th>
              <th className={styles.th}>{order.pn.id}</th>
              <th className={styles.th}>{order.batch}</th>
              <th className={styles.th}>{order.pn.description}</th>
              <th className={styles.th}>{order.qty}</th>
              {assignBtn(order.dhra, order.number)}
              {fromISOtoDate(order.updated)}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    </div>
  );
}
