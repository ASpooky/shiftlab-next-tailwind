import axios from 'axios'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { Credential } from '../types'
import { useError } from './useError'
import { useLoginContext } from '../context/LoginContext'
import { Workspace, Shift } from '../types'
import dayjs from 'dayjs'

export const useMutateAuth = () => {
  const router = useRouter()
  const {
    setViewLoginModal,
    setIsLogin,
    setViewLogoutModal,
    setWorkspaceState,
    setViewWorkspace,
    setShiftsState,
  } = useLoginContext()
  const { switchErrorHandling } = useError()

  const loginMutation = useMutation(
    async (user: Credential) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/login`, user),
    {
      onSuccess: () => {
        axios
          .get<Workspace[]>(`${process.env.REACT_APP_API_URL}/workspaces`, {
            withCredentials: true,
          })
          .then(function (response) {
            if (response.data.length === 0) {
              setWorkspaceState([
                {
                  id: 0,
                  name: '',
                  salary: 0,
                  morning_salary: 0,
                  night_salary: 0,
                  color: '',
                  created_at: '',
                  update_at: '',
                },
              ])
            } else {
              setWorkspaceState(response.data)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        axios
          .get<Shift[]>(`${process.env.REACT_APP_API_URL}/shifts`, {
            withCredentials: true,
          })
          .then(function (response) {
            if (response.data.length === 0) {
              setShiftsState([
                {
                  id: 0,
                  workspace_id: 0,
                  start_time: '',
                  end_time: '',
                  created_at: '',
                  update_at: '',
                },
              ])
            } else {
              setShiftsState(response.data)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        router.push('/MyPage')
        setViewLoginModal(false)
        setIsLogin(true)
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )
  const registerMutation = useMutation(
    async (user: Credential) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/signup`, user),
    {
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )
  const logoutMutation = useMutation(
    async () => await axios.post(`${process.env.REACT_APP_API_URL}/logout`),
    {
      onSuccess: () => {
        router.push('/')
        setIsLogin(false)
        setViewLogoutModal(false)
        setViewWorkspace(0)
        setWorkspaceState([
          {
            id: 15,
            name: 'セブンイレブン',
            salary: 800,
            morning_salary: 100,
            night_salary: 200,
            color: 'green',
            created_at: '',
            update_at: '',
          },
          {
            id: 1,
            name: '鳥貴族',
            salary: 900,
            morning_salary: 200,
            night_salary: 100,
            color: 'teal',
            created_at: '',
            update_at: '',
          },
          {
            id: 16,
            name: '塾',
            salary: 1000,
            morning_salary: 0,
            night_salary: 0,
            color: 'red',
            created_at: '',
            update_at: '',
          },
        ])
        setShiftsState([
          {
            id: 1,
            workspace_id: 15,
            start_time: dayjs().format('YYYY/MM/DDTHH:mm'),
            end_time: dayjs().format('YYYY/MM/DDTHH:mm'),
            created_at: '',
            update_at: '',
          },
          {
            id: 2,
            workspace_id: 1,
            start_time: dayjs('2023/08/4 09:00:00').format('YYYY/MM/DDTHH:mm'),
            end_time: dayjs('2023/08/4 17:00:00').format('YYYY/MM/DDTHH:mm'),
            created_at: '',
            update_at: '',
          },
          {
            id: 3,
            workspace_id: 15,
            start_time: dayjs('2023/08/31 09:00:00').format('YYYY/MM/DDTHH:mm'),
            end_time: dayjs('2023/08/31 17:00:00').format('YYYY/MM/DDTHH:mm'),
            created_at: '',
            update_at: '',
          },
          {
            id: 4,
            workspace_id: 16,
            start_time: dayjs('2023/08/31 09:00:00').format('YYYY/MM/DDTHH:mm'),
            end_time: dayjs('2023/08/31 17:00:00').format('YYYY/MM/DDTHH:mm'),
            created_at: '',
            update_at: '',
          },
        ])
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )
  return { loginMutation, registerMutation, logoutMutation }
}
