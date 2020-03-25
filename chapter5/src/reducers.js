
const userReducer = (state, action) => {
  switch(action.type) {
    case 'LOGIN':
    case 'REGISTER':
      return action.username
    case 'LOGOUT':
      return ''
    default:
      return state;
  }
}

const postsReducer = (state, action) => {
  switch(action.type) {
    case 'CREATE_POST':
      const newPost = {
        title: action.title,
        content: action.content,
        author: action.author
      }
      return [ newPost, ...state ]
    default:
      return state;
  }
}

const appReducer = (state, action) => {
  return {
    user: userReducer(state.user, action),
    posts: postsReducer(state.posts, action)
  }
}

export default appReducer;