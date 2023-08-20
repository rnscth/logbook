'use client'
import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import styles from './styles.module.css'
import { toast } from 'react-toastify';
export default AddOrders;
import {Inter} from 'next/font/google'
import { UserContext } from "../userContext";
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Logbook',
  description: 'Complete Orders',
}

const inter = Inter({ subsets: ['latin'] })

function AddOrders() {
  const [showUploadBtn, setShowUploadBtn] = useState(false);
  const [tableArray, setTableArray] = useState<any[]>([]);
  //@ts-ignore
  const {user, setHeaderTitle, apiRoute, checkSession, authTokens} = useContext(UserContext);
  function handleClearClipboard(){
    setTableArray([]);
    setShowUploadBtn(false);
  }

  useEffect(() => {
    checkSession()
    setHeaderTitle('Add Orders')
  }, []);

  useEffect(() => {
    if (tableArray.length > 0) {
      setShowUploadBtn(true);
      toast.success('Table copied!')
      console.log(tableArray);
    } 
  }, [tableArray]);

  async function handlePasteClipboard() {
    navigator.clipboard.readText().then(function (text) {
      constructTable(text);
     });
  }

  function constructTable(pastedInput: string) {
    const rawRows = pastedInput.replace("\r", "").split("\n");
    const headersArray = rawRows[0].split("\t");
    const output: any[] = [];
  
    rawRows.slice(1, rawRows.length - 1).forEach((rawRow: string) => {
      const rowObject: Record<string, string> = {};
      const values = rawRow.replace("\r", "").split("\t");
  
      headersArray.forEach((header: string, idx: number) => {
        rowObject[header] = values[idx];
      });
  
      const requiredFields = ["batch", "date", "description", "hour", "order_number", "pn_id", "qty"];
      if (requiredFields.every(field => rowObject[field] !== "N/A")) {
        const filteredRowObject: Record<string, string | number> = {
          number: parseInt(rowObject.order_number),
          qty: parseInt(rowObject.qty),
          batch: rowObject.batch,
          pn_id: rowObject.pn_id,
          pn_description: rowObject.description,
          date: rowObject.date,
          hour: rowObject.hour,
        };
        output.push(filteredRowObject);
      }
    });
    setTableArray(output); 
  }

  async function handleUploadNewOrder(order: { number: any; pn_id: any; pn_description: any; batch: any; qty: any; hour: any; date: any; }) {
    let date = new Date();
    let config = {
      headers: {
        'Authorization': 'Bearer ' + authTokens.access  
      }
    };
    let newOrder = { 
      'user_id' : user.user_id, 
      'number' : order.number,
      'pn_id' : order.pn_id, 
      'pn_description' : order.pn_description,
      'batch' : order.batch, 
      'qty' : order.qty,
      'hour' : order.hour,
      'date' : order.date,
      'datetime': date.toISOString(), 
    };
    try {
      const response = await axios.post(`${apiRoute}order/add/`, newOrder,config );
      console.log('Order added successfully:', response.data);
      if (response.data.status != 'alrready uploaded'){
      toast.success(`${response.data.success}`);
    }
    } catch (error) {
      console.error('Error adding order:', error);
      toast.warn(`Error uploading ${order.number}`);
    }
  }

  return (
  <section className={inter.className}>
    <div className={styles.addOrders}>
      <div className={styles.btnBox}>
        <button className={styles.addBtn} onClick={handlePasteClipboard}>
          Paste Table
        </button>
        <button className={styles.addBtn} onClick={handleClearClipboard}>
          Clear Table
        </button>
        <button
          className={styles.addBtn}
          hidden={!showUploadBtn}
          onClick={() => tableArray.forEach((order)=>handleUploadNewOrder(order))}
        >
          Upload Orders
        </button>
      </div>
      <div className={styles.addContent}>
        <table className={styles.addOrdersTable} hidden={!showUploadBtn}>
          <thead>
            <tr className={styles.addOrderHeader}>
              <th>Order</th>
              <th>Date</th>
              <th>Hour</th>
              <th>P/N</th>
              <th>Batch</th>
              <th className={styles.desc}>Description</th>
              <th>QTY</th>
            </tr>
          </thead>
          <tbody>
            {tableArray.map((order) => (
              <tr key={order.order_number} className={styles.newOrder}>
                <th>{order.number}</th>
                <th>{order.date}</th>
                <th>{order.hour}</th>
                <th>{order.pn_id}</th>
                <th>{order.batch}</th>
                <th>{order.pn_description}</th>
                <th>{order.qty}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
  );
}
