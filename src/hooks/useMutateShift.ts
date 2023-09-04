import axios from 'axios'
import { useMutation } from 'react-query'
import { useError } from './useError'
import { Shift } from '../types'
import { useLoginContext } from '../context/LoginContext'

export const useMutateShift = () => {
  const { switchErrorHandling } = useError()
  const { shiftsState, setShiftsState } = useLoginContext()

  const createShiftMutation = useMutation(
    async (workspace: Omit<Shift, 'id' | 'created_at' | 'update_at'>) =>
      await axios.post<Shift>(
        `${process.env.REACT_APP_API_URL}/shifts`,
        workspace
      ),
    {
      onSuccess: (response) => {
        if (shiftsState.filter((Shift) => Shift.id !== 0).length === 0) {
          setShiftsState([response.data])
        } else {
          setShiftsState([...shiftsState, response.data])
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
  const updateShiftMutation = useMutation(
    async (shift: Shift) =>
      await axios.put(
        `${process.env.REACT_APP_API_URL}/shifts/${shift.id}`,
        shift
      ),
    {
      onSuccess: (res) => {
        setShiftsState([
          ...shiftsState.filter((shift) => shift.id !== res.data.id),
          res.data,
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
  const deleteShiftMutation = useMutation(
    async (id: number) =>
      await axios.delete(`${process.env.REACT_APP_API_URL}/shifts/${id}`),
    {
      onSuccess: (_, variables) => {
        if (
          shiftsState.filter((Shift) => Shift.id !== variables).length === 0
        ) {
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
          setShiftsState(shiftsState.filter((shift) => shift.id !== variables))
        }
        0
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
    createShiftMutation,
    updateShiftMutation,
    deleteShiftMutation,
  }
}
