'use client'
import React from 'react'
import Header from './header'
import Sidebar from './sidebar'
import ContentHeader from './contentHeader'
import styles from './styles.module.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './userContext'
import { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Logbook',
  description: 'OrdersApp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
  <html lang="en">
    <body className={styles.body}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"/>
      <UserProvider>
      <Header/>
      <main className={styles.main} >
        <Sidebar/>
          <div className={styles.content}>
            <ContentHeader/>
            {children}
          </div>
      </main>
      </UserProvider>
    </body>
  </html>
  )
}