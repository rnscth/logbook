'use client'
import React from 'react'
import { Metadata } from 'next'
import LineChart from './lineChart'
import FilledLineChart from './filledlinechart'
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


    var chartDistr = {
        monthDistr : {
            title : "Current Month Distribution",
            distr : {
                New : 16,
                Reopen : 3,
                Assigned : 6,
                Liberated : 12, 
                Red : 24,
                Rejected : 7, 
                Complete : 4,
            }
        },
        yearDistr : {
            title : "Current Year Distribution",
            distr : {
                New : 16,
                Reopen : 3,
                Assigned : 8,
                Liberated : 12, 
                Red : 14,
                Rejected : 70, 
                Complete : 400,
            }
        },
        monthUserDistr : {        
            title : 'Current Month User distribution',
            distr : {
                lruelas : 12,
                oramos : 10, 
                mprieto : 3,
                tolivas : 15,
            }
        },
        yearUserDistr : {        
            title : 'Current Year User distribution',
            distr : {
                lruelas : 120,
                oramos : 97, 
                mprieto : 33,
                tolivas : 49,
            }   
        }
    }

    //@ts-ignore
    const {setHeaderTitle, apiRoute, checkSession, authTokens} = useContext(UserContext);

    useEffect(() => {
        checkSession()
        setHeaderTitle('Dashboard')
    }, []);
    

  return (
    <section className={inter.className}>
        <div  className={styles.dashboardSection}>
            <div className={styles.distributionCharts}>
                <DoughnutChart distribution={chartDistr.monthDistr}/>
                <DoughnutChart distribution={chartDistr.yearDistr}/>
            </div>
            <div className={styles.distributionCharts}>
                <BarChart distribution={chartDistr.monthUserDistr}/>
                <BarChart distribution={chartDistr.yearUserDistr}/>
            </div>
        </div>
    </section>
  )
}