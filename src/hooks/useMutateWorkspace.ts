import axios from 'axios'
import { useMutation } from 'react-query'
import { Workspaces } from '../Data/Data'
import { useError } from './useError'
import { Workspace } from '../types'
import { useLoginContext } from '../context/LoginContext'
import { prepareCssVars } from '@mui/system'

export const useMutateWorkspace = () => {
  const { switchErrorHandling } = useError()
  const {
    workspaceState,
    setWorkspaceState,
    setViewWorkspace,
    setShiftsState,
    shiftsState,
  } = useLoginContext()

  const createWorkspaceMutation = useMutation(
    async (workspace: Omit<Workspace, 'id' | 'created_at' | 'update_at'>) =>
      await axios.post<Workspace>(
        `${process.env.REACT_APP_API_URL}/workspaces`,
        workspace
      ),
    {
      onSuccess: (response) => {
        console.log('職場登録成功')
        if (
          workspaceState.filter((Workspace) => Workspace.id !== 0).length === 0
        ) {
          setWorkspaceState([response.data])
        } else {
          setWorkspaceState([...workspaceState, response.data])
        }
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
  const updateWorkspaceMutation = useMutation(
    async (workspace: Workspace) =>
      await axios.put(
        `${process.env.REACT_APP_API_URL}/workspaces/${workspace.id}`,
        workspace
      ),
    {
      onSuccess: () => {
        console.log('職場更新成功')
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
  const deleteWorkspaceMutation = useMutation(
    async (id: number) =>
      await axios.delete(`${process.env.REACT_APP_API_URL}/workspaces/${id}`),
    {
      onSuccess: (_, variables) => {
        console.log('職場削除成功', variables)
        if (
          workspaceState.filter((Workspace) => Workspace.id !== variables)
            .length === 0
        ) {
          setWorkspaceState([
            {
              id: 0,
              name: 'none',
              salary: 0,
              morning_salary: 0,
              night_salary: 0,
              color: '',
              created_at: '',
              update_at: '',
            },
          ])
        } else {
          setWorkspaceState(
            workspaceState.filter((workspace) => workspace.id !== variables)
          )
          setShiftsState(
            shiftsState.filter((shift) => shift.workspace_id !== variables)
          )
        }
        setViewWorkspace(0)
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
  return {
    createWorkspaceMutation,
    updateWorkspaceMutation,
    deleteWorkspaceMutation,
  }
}
