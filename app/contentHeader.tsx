import React, { useState } from 'react'
import styles from './styles.module.css'
import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from './userContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


export default function ContentHeader() {
  //@ts-ignore
  const {headerTitle, authTokens} = useContext(UserContext);
  const [search, setSearch] = useState('');
  const apiRoute = `http://localhost:8000/orders/`
  const router = useRouter();

  async function handleSearch(e: { preventDefault: () => void; }){
    e.preventDefault();
    try {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + authTokens.access  
        }
      };
      const response = await axios.get(`${apiRoute}order/${search}/`, config);
      if (response.data.number == search){
        router.push(`/displayOrder/${search}`);
      } 
      setSearch('')
    } catch (error) {
      toast.warn('No search result')
      console.error('Error fetching data:', error);
      setSearch('')
    }

  }

    return (
        <section className={styles.contentHeader}>
          <div className={styles.headertitle}>{headerTitle}</div>
          <div className={styles.searchForm}>
            <form className={styles.searchForm} 
            onSubmit={handleSearch}
            >
              <div>
                <input
                  autoComplete="off"
                  className={styles.searchInput}
                  type="number"
                  name="Search"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button title="Search" className={styles.btn}>
                <Image src="/lupa.png" height="20" width="20" alt="searchbtn" />
              </button>
            </form>
          </div>
        </section>
    );
}
  

