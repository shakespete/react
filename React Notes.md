<h1>Redux and Hooks</h1>

Redux itself just deals with JavaScript objects, so it provides the store, deals with actions and action creators, and handles reducers.
React Redux provides connectors in order to connect Redux to our React components.
Redux Thunk is a middleware that allows us to deal with asynchronous requests in Redux.

<h3>Steps in developing a Redux application:</h3>

1) Define the state
2) Define the actions that are going to change the state
3) Define the reducer functions which carry out the state modification

<h3>Action Creators</h3>

- Synchronous action creators: These simply return an action object
- Asynchronous action creators: These return an async function, which will later dispatch an action

<h3>redux-thunk</h3>
This middleware checks if an action creator returned a function, rather than a plain object, and if that is the case, it executes that function, while passing the dispatch function to it as an argument.
Using the redux-thunk middleware, we can now dispatch functions that will later dispatch actions, which means that our asynchronous action creator is going to work fine now.

**Redux reducers differ from Reducer Hooks in that they have certain conventions:**
1) Each reducer needs to set its initial state by defining a default value in the function definition
2) Each reducer needs to return the current state for unhandled actions

Container components use a connector to connect Redux to a presentational component. This connector accepts two functions:
1) **mapStateToProps(state):** Takes the current Redux state, and returns an object of props to be passed to the component; used to pass state to the component
2) **mapDispatchToProps(dispatch):** Takes the dispatch function from the Redux store, and returns an object of props to be passed to the component; used to pass action creators to the component

Container components use a connector to connect Redux to a presentational component. This connector accepts two functions:
1) mapStateToProps(state): Takes the current Redux state, and returns an object of props to be passed to the component; used to pass state to the component
2) mapDispatchToProps(dispatch): Takes the dispatch function from the Redux store, and returns an object of props to be passed to the component; used to pass action creators to the component


<h2>Redux Hooks</h2>

<h3>useDispatch</h3>
The useDispatch Hook returns a reference to the dispatch function that is provided by the Redux store. It can be used to dispatch actions that are returned from action creators.

<h3>useSelector</h3>
The Selector Hook. It allows us to get data from the Redux store state, by defining a selector function.

const result = useSelector(selectorFn, equalityFn)

selectorFn is a function that works similarly to the mapStateToProps function. It will get the full state object as its only argument. The selector function gets executed whenever the component renders, and whenever an action is dispatched (and the state is different than the previous state).


<h2>React Hooks</h2>

<h3>useEffect</h3>
The useEffect Hook accepts a function that contains code with side effects. The function passed to the Hook will run after the render is done and the component is on the screen.

A cleanup function can be returned from the Hook, which will be called when the component unmounts and is used to, for example, clean up timers or subscriptions. The cleanup function will also be called before the effect is triggered again, when dependencies of the effect update.

To avoid triggering the effect on every re-render, we can specify an array of values as the second argument to the Hook. Only when any of these values change, the effect will get triggered again.

This array passed as the second argument is called the dependency array of the effect. If you want the effect to only trigger during mounting, and the cleanup function during unmounting, we can pass an empty array as the second argument.

<h3>useMemo</h3>
The useMemo Hook takes a result of a function and memoizes it. This means that it will not be recomputed every time. This Hook can be used for performance optimizations.

*useMemo runs during rendering, so make sure the computation function does not cause any side effects, such as resource requests. Side effects should be put into a useEffect Hook.*

The array passed as the second argument specifies the dependencies of the function. If any of these values change, the function will be recomputed; otherwise, the stored result will be used. If no array is provided, a new value will be computed on every render. If an empty array is passed, the value will only be computed once.

useMemo is similar to useCallback except it allows you to apply memoization to any value type (not just functions). 

<h3>useCallback</h3>
The useCallback Hook works similarly to the useMemo Hook. However, it returns a memoized callback function instead of a value. The function returned will only be redefined if one of the dependency values passed in the array of the second argument changes.

```
const memoizedCallback = useCallback(
  () => doSomething(a, b, c),
  [a, b, c]
)
```

The previous code is similar to the following useMemo Hook:

```
const memoizedCallback = useMemo(
  () => () => doSomething(a, b, c),
  [a, b, c]
)
```

<h3>useRef</h3>
The useRef Hook returns a ref object that can be assigned to a component or element via the ref prop.

After assigning the ref to an element or component, the ref can be accessed via refContainer.current. If InitialValue is set, refContainer.current will be set to this value before assignment.

<h3>useLayoutEffect</h3>
The useLayoutEffect Hook is identical to the useEffect Hook, but it fires synchronously after all DOM mutations are completed and before the component is rendered in the browser.

Do not use this Hook unless it is really needed, which is only in certain edge cases. useLayoutEffect will block visual updates in the browser, and thus, is slower than useEffect.

The rule here is to use useEffect first. If your mutation changes the appearance of the DOM node, which can cause it to flicker, you should use useLayoutEffect instead.