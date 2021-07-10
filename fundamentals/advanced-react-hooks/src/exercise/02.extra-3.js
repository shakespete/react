// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'

function useSafeDispatch(dispatch) {
  // What's the way that we know if a component's been unmounted?
  // We are going to make a mountedRef here with React useRef.
  // We'll initialize that to false, and then we will need to
  // set that value to true when this is mounted.
  const mountedRef = React.useRef(false)

  // useLayoutEffect: This will ensure that this function is going to be called
  // as soon as we're mounted without waiting for the browser to paint the screen,
  // and it will also ensure that this cleanup is called as soon as we're unmounted
  // without waiting for anything either.
  React.useLayoutEffect(() => {
    // When this function is called, it's now been mounted. When this function
    // is called, we know that it's been unmounted, and then we'll add an
    // empty dependency list to make sure this is only called on mount and
    // on unmount.
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return React.useCallback(
    // We'll take any number of args, I don't really care, and forward all of those args.
    (...args) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch],
    // ESLint knew before that this dispatch function was coming from useReducer,
    // but now it can't track across function calls. We are going to have to just
    // add dispatch to our array list here, but that's not a problem because the
    // dispatch function is stable anyway. This will never change, so we don't
    // need to worry about that. We'll just include it even though it's not going
    // to change.
  )
}

function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return {status: 'pending', data: null, error: null}
    }
    case 'resolved': {
      return {status: 'resolved', data: action.data, error: null}
    }
    case 'rejected': {
      return {status: 'rejected', data: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAsync(initialState) {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  })

  const dispatch = useSafeDispatch(unsafeDispatch)

  const {data, error, status} = state

  const run = React.useCallback(
    promise => {
      dispatch({type: 'pending'})
      promise.then(
        data => dispatch({type: 'resolved', data}),
        error => dispatch({type: 'rejected', error}),
      )
    },
    [dispatch],
  )
  return {
    error,
    status,
    data,
    run,
  }
}

function PokemonInfo({pokemonName}) {
  const {data: pokemon, status, error, run} = useAsync({
    status: pokemonName ? 'pending' : 'idle',
  })

  React.useEffect(() => {
    if (!pokemonName) return
    run(fetchPokemon(pokemonName))
  }, [pokemonName, run])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = React.useState(true)
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={e => setMountApp(e.target.checked)}
        />{' '}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  )
}

export default AppWithUnmountCheckbox
