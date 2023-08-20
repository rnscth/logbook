import Link from "next/link"
import React from 'react'
import styles from './styles.module.css'
import Image from 'next/image'

export default function Sidebar() {

  return (
    <aside className={styles.aside}>
      <ul className={styles.ul}>
        <li key="user" className={styles.sidebtn}>
          <Link href="/user">
            <button
            title="User"
            className={styles.btn}>
              <Image src="/usuario.png" height="23" width="23" alt="user" />
            </button></Link>
        </li>
        <li key="home" className={styles.sidebtn}><Link href="/active">
          <button
            title="Home"
            className={styles.btn}>
            <Image src="/home.png" height="20" width="20" alt="home" />
          </button></Link>
        </li>
        <li key="add" className={styles.sidebtn}><Link href="/add">
          <button
            title="Add"
            className={styles.btn}>
            <Image src="/add.png" height="20" width="20" alt="add" />
          </button></Link>
        </li>
        <li key="release" className={styles.sidebtn}><Link href="/complete">
          <button
            title="Release"
            className={styles.btn}>
            <Image src="/checkmark.png" height="22" width="22" alt="complete" />
          </button></Link>
        </li>
        <li key="red" className={styles.sidebtn}><Link href="/red">
          <button
            title="Red"
            className={styles.btn}>
            <Image src="/xmarck.png" height="23" width="23" alt="red" />
          </button></Link>
        </li>
        <li key="reject" className={styles.sidebtn}><Link href="/reject">
          <button
            title="Reject"
            className={styles.btn}>
            <Image src="/reject.png" height="25" width="25" alt="reject" />
          </button></Link>
        </li>
        <li key="filter" className={styles.sidebtn}><Link href="/filter">
          <button
            title="Filter"
            className={styles.btn}>
            <Image src="/filter.png" height="20" width="20" alt="filter" />
          </button></Link>
        </li>
        <li key="dashboard" className={styles.sidebtn}><Link href="/dashboard">
          <button
            title="Dashboard"
            className={styles.btn}>
            <Image src="/graphic.png" height="20" width="20" alt="graphic" />
          </button></Link>
        </li>
      </ul>
    </aside>
  );
}

