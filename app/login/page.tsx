'use client'
import styles from './styles.module.css'
import {Inter} from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../userContext';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Logbook',
  description: 'Login Page',
}

const inter = Inter({ subsets: ['latin']})

const LoginPage: React.FC = () => {

  const { login, setHeaderTitle  } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

let loginUser = (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  login(username, password);
  setPassword('');
  setUsername('');
}

useEffect(() => {
  setHeaderTitle('Login Page')
}, []);


  return (
  <main className={inter.className}>
    <section className={styles.loginPage}>
      <div className={styles.loginTitle}>
        Login
      </div>
      <form onSubmit={loginUser}> 
        <div className={styles.loginForm}>
          <div className={styles.inputForm}>
          <input
          autoComplete='off'
          type="text"
          placeholder='Enter Username'
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
            </div>
          <div className={styles.inputForm}>          
          <input
          type="password"
          placeholder='Enter Password'
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
          </div>
          <div className={styles.inputForm}>
            <button>Login</button>
          </div>
        </div>
      </form>
    </section>
  </main>
  )
};

export default LoginPage;