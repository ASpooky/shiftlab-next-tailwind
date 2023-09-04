import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../component/layout'
import { CalendarProvider } from '../context/CalendarContext'
import { LoginProvider } from '../context/LoginContext'
import '../styles/index.css'
import { CsrfToken } from '../types'
import { useEffect } from 'react'
import axios from 'axios'

function MyApp({ Component, pageProps }: AppProps) {
  //csrftokenの取得
  useEffect(() => {
    axios.defaults.withCredentials = true
    const getCsrfToken = async () => {
      console.log('server url')
      console.log(`${(process.env.NODE_ENV, process.env.REACT_APP_API_URL)}`)
      const { data } = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrf`
      )
      axios.defaults.headers.common['X-CSRF-Token'] = data.csrf_token
    }
    getCsrfToken()
  }, [])
  return (
    <LoginProvider>
      <CalendarProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CalendarProvider>
    </LoginProvider>
  )
}

export default MyApp
