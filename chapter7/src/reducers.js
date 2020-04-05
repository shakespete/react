
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
    case 'FETCH_POSTS':
      return action.posts
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

function errorReducer (state, action) {
  switch (action.type) {
    case 'POSTS_ERROR':
      return 'Failed to fetch posts'

    default:
      return state
  }
}

const appReducer = (state, action) => {
  return {
    user: userReducer(state.user, action),
    posts: postsReducer(state.posts, action),
    error: errorReducer(state.error, action)
  }
}

export default appReducer;