import axios from 'axios'
import { useRouter } from 'next/router'
import { deflateSync } from 'zlib'
import { CsrfToken } from '../types'

export const useError = () => {
  const router = useRouter()
  const getCsrfToken = async () => {
    const { data } = await axios.get<CsrfToken>(
      `${process.env.REACT_APP_API_URL}/csrf`
    )
    axios.defaults.headers.common['X-CSRF-TOKEN'] = data.csrf_token
  }
  const switchErrorHandling = (msg: string) => {
    switch (msg) {
      case 'invalid csrf token':
        getCsrfToken()
        alert('CSRF token is invalid,please try agein')
        break
      case 'invalid or expired jwt':
        alert('access token expired,please login')
        router.push('/')
      case 'missing or malformed jwt':
        alert('access token is not valid,please login')
        router.push('/')
      case 'duplicated key not allowed':
        alert('email already exist,please use another one')
        break
      case 'crypto/bcrypt: hashedPassword is not the hash of the given password':
        alert('password is not correct')
        break
      case 'record not found':
        alert('email is not correct')
      default:
        alert(msg)
    }
  }
  return { switchErrorHandling }
}
