'use client'
import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from './userContext';

export default function Header() {
  //@ts-ignore
  const { user, logoutUser, welcomeMsj  } = useContext(UserContext);


  return (
  <>
    <header className={styles.header}>
      <div className="logo">
        <Link className={styles.link} href="/"><h1 className={styles.h1}>Logbook</h1></Link>
      </div>
      <div className={styles.intuitive}>
        <div className={styles.userName} >
          <div className={styles.name} hidden={!welcomeMsj}>Welcome, 
          {user ? user.userName : null} 
          </div>
          <div className={styles.logotBox}>
            <button onClick={logoutUser} className={styles.logoutBtn}>
              <Image title='Logout'src="/key.png" height="20" width="20" alt="intuitivelogo" priority={true}/>
            </button>
          </div>
        </div>
      </div>
    </header>
    <div className={styles.spacer}/>
  </>
  );
}