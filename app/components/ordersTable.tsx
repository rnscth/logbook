'use client'
import React from 'react'
import axios from 'axios'
import styles from './styles.module.css'
import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../userContext';
import { toast } from 'react-toastify';

interface Order {
  id: React.Key;
  status: {
      id: number;
      color: any;
  };
  number: number;
  date: string;
  hour: string;
  pn: {
      id: string ;
      description: string;
  };
  batch: string;
  qty: number;
  dhra: {
      username: string;
  };
  updated: string;
}

export default function OrdersTable(ordersRoute: { ordersRoute: string; }){
  let route = ordersRoute.ordersRoute

  const { user, apiRoute, orders, setOrders, config } = useContext(UserContext);

  let getOrders = async (route: string) => {
    console.log(route);
    try {
      const response = await axios.get(route, config );
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  async function handleAssign(order_number: number){
    let date = new Date();
    let assignOrder = {
      user_id : user.user_id,
      date : date.toISOString(),
    }
      var response = await axios.put(`${apiRoute}order/assign/${order_number}/`, assignOrder, config);
      console.log(response.data)
      toast.success(response.data.success)
      getOrders(route);
  }

  function assignBtn(dhra: { username: any; }, order_number: number ){  
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
    {orders ? 
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
          {orders.map((order: Order) => (
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
      </table> : <div>Loading..</div>}
    </section>
  );
}
