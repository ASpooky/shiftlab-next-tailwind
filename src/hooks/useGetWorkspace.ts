import axios from 'axios'
import { Workspace } from '../types'
import { useLoginContext } from '../context/LoginContext'

export const useGetWorkspaces = async () => {
  const { workspaceState, setWorkspaceState } = useLoginContext()
  await axios
    .get<Workspace[]>(`${process.env.REACT_APP_API_URL}/workspaces`, {
      withCredentials: true,
    })
    .then(function (response) {
      if (response.data.length === 0) {
      } else {
        setWorkspaceState(response.data)
      }
      return response.data
    })
    .catch(function (error) {})
}
