import React, { createContext, useContext, useState, Dispatch } from 'react'
import { Workspace, Shift } from '../types'
import dayjs from 'dayjs'

const LoginContext = createContext(
  {} as {
    isLogin: boolean
    setIsLogin: Dispatch<React.SetStateAction<boolean>>
    viewLoginModal: boolean
    setViewLoginModal: Dispatch<React.SetStateAction<boolean>>
    viewLogoutModal: boolean
    setViewLogoutModal: Dispatch<React.SetStateAction<boolean>>
    workspaceState: Workspace[]
    setWorkspaceState: Dispatch<React.SetStateAction<Workspace[]>>
    shiftsState: Shift[]
    setShiftsState: Dispatch<React.SetStateAction<Shift[]>>
    viewWorkspace: number
    setViewWorkspace: Dispatch<React.SetStateAction<number>>
  }
)

const LoginProvider = ({ children }: any) => {
  const [viewLoginModal, setViewLoginModal] = useState(false)
  const [viewLogoutModal, setViewLogoutModal] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [viewWorkspace, setViewWorkspace] = useState(0)
  //サンプルページで表示するデータを初期値とする
  const [workspaceState, setWorkspaceState] = useState([
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
  const [shiftsState, setShiftsState] = useState([
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

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        setIsLogin,
        viewLoginModal,
        setViewLoginModal,
        viewLogoutModal,
        setViewLogoutModal,
        workspaceState,
        setWorkspaceState,
        shiftsState,
        setShiftsState,
        viewWorkspace,
        setViewWorkspace,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}

const useLoginContext = () => useContext(LoginContext)
export { LoginProvider, useLoginContext }
