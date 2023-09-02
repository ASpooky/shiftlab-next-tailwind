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
      console.log('fetch成功', response.data)
      if (response.data.length === 0) {
        console.log('未登録')
      } else {
        setWorkspaceState(response.data)
      }
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}
