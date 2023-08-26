'use client'
import React from 'react'
import { Metadata } from 'next'
import BarChart from './barChart'
import { useState, useEffect,useContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import {Inter} from 'next/font/google'
import { UserContext } from "../userContext";
import DoughnutChart from './doughnutChart'
import styles from './styles.module.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Logbook',
  description: 'Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    const {setHeaderTitle, apiRoute, checkSession, authTokens} = useContext(UserContext);

    var [chartDistr, setChartDist] = useState<any>(null);

    async function getDistr(){
        try {
            var response = await axios.get(`${apiRoute}distribution/`);
            console.log(response.data)
            setChartDist(response.data)
        } catch (error) {
            toast.warn('Error fetching Dashboard')
        }
    }

    useEffect(() => {
        checkSession()
        setHeaderTitle('Dashboard')
        getDistr()
    }, []);
    

  return (
    <section className={inter.className}>
        {chartDistr ? (
        <div  className={styles.dashboardSection}>
            <div className={styles.distributionCharts}>
                <DoughnutChart distribution={chartDistr.monthDistr}/>
                <DoughnutChart distribution={chartDistr.yearDistr}/>
            </div>
            <div className={styles.distributionCharts}>
                <BarChart distribution={chartDistr.monthUserDistr}/>
                <BarChart distribution={chartDistr.yearUserDistr}/>
            </div>
        </div> ) : <div className={styles.dashboardSection}>Loading..</div>}
    </section>
  )
}