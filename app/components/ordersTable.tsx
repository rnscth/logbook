'use client'
import React from 'react'
import { useEffect, useState} from 'react';
import axios from 'axios'
import styles from './styles.module.css'
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../userContext';


export default function OrdersTable(route : any){
  //@ts-ignore
  const { user, authTokens, apiRoute, orders, getOrders } = useContext(UserContext);

  async function handleAssign(order_number: number){
    let date = new Date();
    let assignOrder = {
      user_id : user.user_id,
      date : date.toISOString(),
    }
    let config = {
      headers: {
        'Authorization': 'Bearer ' + authTokens.access  
      }
    };

    try {
      var response = await axios.put(`${apiRoute}order/assign/${order_number}/`, assignOrder, config);
      console.log(response.data)
      getOrders(route);
    } catch (error) {
      // if (!response.data.success) {
      //   console.log(error)
      //   toast.warn(`Order ${order_number} already assigned`);
      // }else {
      //   getOrders(route);
      //   toast.success(`Order ${order_number} assigned successfully`);
      // }
    }
  }

  function assignBtn(dhra: { username: any; }, order_number: number){  
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

  return (
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
          {orders.map((order: { id: React.Key ; status: { color: any; }; number: number ; date: string ; hour: string; pn: { id: string | number ; description: string  }; batch: string ; qty: number ; dhra: { username: string; }; updated: string; }) => (
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
  );
}
