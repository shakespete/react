import { useContext } from 'react'
import { StateContext } from '../contexts'

const useUserState = () => {
  const { state } = useContext(StateContext)
  return state.user
}

export default useUserState;