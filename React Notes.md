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

This array passed as the second argument is called the dependency array of the effect. If you want the effect to only trigger during mounting, and the cleanup function during unmounting, we can pass an empty array as the second argument. The dependency array can be used to control when an effect is invoked. An empty dependency array causes the effect to only be invoked once after the initial render.

The render always comes before useEffect. The render happens first and then all effects run in order with full access to all of the values from the render.

We use useEffect when a render needs to cause side effects. Think of a side effect as something that a function does that isn’t part of the return. But we might want the component to do more than that. Those things we want the component to do other than return UI are called effects.

Every time we render, useEffect has access to the latest values from that render: props, state, refs, etc. Think of useEffect as being a function that happens after a render. When a render fires, we can take a look at that render’s values and use them in the effect. Then once we render again, the whole thing starts over. New values, then new renders, then new effects.

If you return a function from the effect, the function will be invoked when the component is removed from the tree

<h3>memo</h3>
The memo function can be used to create a component that will only render when its properties change. The second argument sent to the memo function is a predicate. A predicate is a function that only returns true or false. 

<h3>useMemo</h3>
The useMemo Hook takes a result of a function and memoizes it. This means that it will not be recomputed every time. This Hook can be used for performance optimizations. In a memoized function, the result of a function call is saved and cached. Then when the function is called again with the same inputs, the cached value is returned.

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

When calling useRef(), you’re creating an object. This object is a container for storing any mutable value. Refs persist between renders but don’t trigger re-renders.

<h3>useLayoutEffect</h3>
The useLayoutEffect Hook is identical to the useEffect Hook, but it fires synchronously after all DOM mutations are completed and before the component is rendered in the browser.

Do not use this Hook unless it is really needed, which is only in certain edge cases. useLayoutEffect will block visual updates in the browser, and thus, is slower than useEffect.

The rule here is to use useEffect first. If your mutation changes the appearance of the DOM node, which can cause it to flicker, you should use useLayoutEffect instead.

1) render
2) useLayoutEffect is called
3) Browser Paint: the time when the component’s elements are actually added to the DOM
4) useEffect is called

useLayoutEffect is invoked after the render, but before the browser paints the change. In most circumstances, useEffect is the write tool for the job, but if your effect is essential to the browser paint, you may want to use useLayoutEffect. For instance, you may want to obtain the with and height of an element when the window is resized.

Another example of when to use useLayoutEffect is when tracking the position of the mouse.

<h3>useContext</h3>
The useContext Hook accepts a context object and returns the current value for the context. When the context provider updates its value, the Hook will trigger a re-render with the latest value

Using createContext we created a new instance of React context that we named ColorContext. The color context contains two components: the ColorContext.Provider and the ColorContext.Consumer. We need to use the provider to place the colors in state. We add data to context by setting the value property of the Provider.

The Provider will only provide context values to it’s children. The useContext hooks requires the context instance to obtain values from it. In other words the context object itself needs to be passed to the Hook, not the consumer or provider.

The Consumer is accessed within the useContext hook, which means that we no longer have to work directly with the consumer component.



