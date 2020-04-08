import { useContext } from 'react'
import { StateContext } from '../contexts'

const usePostsState = () => {
  const { state } = useContext(StateContext)
  return state.posts
}

export default usePostsState