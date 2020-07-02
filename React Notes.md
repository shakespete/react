<h1>React</h1>
<ul>
  <li>React is declarative. In a declarative program, the syntax itself describes what should happen, and the details of how things happen are abstracted away.</li>
  <li>React can be rendered isomorphically, which means that it can be in platforms other than the browser. This means we can render our UI on the server before it ever gets to the browser.</li>
</ul>

<h1>Redux and Hooks</h1>
<ul>
  <li>Redux itself just deals with JavaScript objects, so it provides the store, deals with actions and action creators, and handles reducers.</li>
  <li>React Redux provides connectors in order to connect Redux to our React components.</li>
  <li>Redux Thunk is a middleware that allows us to deal with asynchronous requests in Redux.</li>
</ul>

<h3>Steps in developing a Redux application:</h3>
<ol>
  <li>Define the state</li>
  <li>Define the actions that are going to change the state</li>
  <li>Define the reducer functions which carry out the state modification</li>
</ol>

<h3>Action Creators</h3>
<ul>
  <li>Synchronous action creators: These simply return an action object</li>
  <li>Asynchronous action creators: These return an async function, which will later dispatch an action</li>
</ul>

<h3>redux-thunk</h3>
This middleware checks if an action creator returned a function, rather than a plain object, and if that is the case, it executes that function, while passing the dispatch function to it as an argument.
Using the redux-thunk middleware, we can now dispatch functions that will later dispatch actions, which means that our asynchronous action creator is going to work fine now.

**Redux reducers differ from Reducer Hooks in that they have certain conventions:**
1) Each reducer needs to set its initial state by defining a default value in the function definition
2) Each reducer needs to return the current state for unhandled actions

Container components use a connector to connect Redux to a presentational component. This connector accepts two functions:
1) **mapStateToProps(state):** Takes the current Redux state, and returns an object of props to be passed to the component; used to pass state to the component
2) **mapDispatchToProps(dispatch):** Takes the dispatch function from the Redux store, and returns an object of props to be passed to the component; used to pass action creators to the component

<h2>Redux Hooks</h2>

<h3>useDispatch</h3>
The useDispatch Hook returns a reference to the dispatch function that is provided by the Redux store. It can be used to dispatch actions that are returned from action creators.

<h3>useSelector</h3>
The Selector Hook. It allows us to get data from the Redux store state, by defining a selector function.

const result = useSelector(selectorFn, equalityFn)

selectorFn is a function that works similarly to the mapStateToProps function. It will get the full state object as its only argument. The selector function gets executed whenever the component renders, and whenever an action is dispatched (and the state is different than the previous state).


<h2>React Hooks</h2>

<h3>useState</h3>
Any time you use a function callback for useState, that function is only going to be called when the component is initially rendered for the rest of the lifetime of that component.

<h3>useEffect</h3>
The useEffect Hook accepts a function that contains code with side effects. The function passed to the Hook will run after the render is done and the component is on the screen.

A cleanup function can be returned from the Hook, which will be called when the component unmounts and is used to, for example, clean up timers or subscriptions. The cleanup function will also be called before the effect is triggered again, when dependencies of the effect update. Also note that useEffect callbacks are only called if they have no dependencies listed or if they have a dependency listed and one of those dependencies changed.

To avoid triggering the effect on every re-render, we can specify an array of values as the second argument to the Hook. Only when any of these values change, the effect will get triggered again.

This array passed as the second argument is called the dependency array of the effect. If you want the effect to only trigger during mounting, and the cleanup function during unmounting, we can pass an empty array as the second argument. The dependency array can be used to control when an effect is invoked. An empty dependency array causes the effect to only be invoked once after the initial render.

<strong>The render always comes before useEffect. The render happens first and then all effects run in order with full access to all of the values from the render.</strong>

We use useEffect when a render needs to cause side effects. Think of a side effect as something that a function does that isn’t part of the return. But we might want the component to do more than that. Those things we want the component to do other than return UI are called effects.

Every time we render, useEffect has access to the latest values from that render: props, state, refs, etc. Think of useEffect as being a function that happens after a render. When a render fires, we can take a look at that render’s values and use them in the effect. Then once we render again, the whole thing starts over. New values, then new renders, then new effects.

If you return a function from the effect, the function will be invoked when the component is removed from the tree.

<h3>memo</h3>
The memo function can be used to create a component that will only render when its properties change. The second argument sent to the memo function is a predicate. A predicate is a function that only returns true or false. 

<h3>useMemo</h3>
The useMemo Hook takes a result of a function and memoizes it. This means that it will not be recomputed every time. This Hook can be used for performance optimizations. In a memoized function, the result of a function call is saved and cached. Then when the function is called again with the same inputs, the cached value is returned.

<strong>useMemo runs during rendering, so make sure the computation function does not cause any side effects, such as resource requests. Side effects should be put into a useEffect Hook.</strong>

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

Updating a ref value is considered a side effect. This is the reason why you want to update your ref value in event handlers and effects and not during rendering (unless you are working on lazy initialization).

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


<h2>React Testing</h2>

<h3>Testing React Components</h3>
React components provide instructions for React to follow when creating and managing updates to the DOM. We can test these components by rendering them and checking the resulting DOM.

We are not running our tests in a browser; we are running them in the terminal with Node.js. Node.js does not have the DOM API that comes standard with each browser. Jest incorporates an npm package called jsdom that is used to simulate a browser environment in Node.js, which is essential for testing React components.

The documentation provides more detail about all of the custom matchers that are available to that you can test exactly what you want to test: https://github.com/testing-library/jest-dom#custom-matchers.

Testing Library is an umbrella over many testing packages for libraries like Vue, Svelte, Reason, Angular, and more. It’s not just for React.

If we want the component to render, a function that is part of React Testing Library, render, will help us do just that. render will replace our need to use ReactDOM.render(). render will take in one argument - the component or element that we want to render. The function returns an object of queries that can be used to check in with values in that component or element.

Code coverage is the process of reporting on how many lines of code have actually been tested. It provides a metric that can help you decide when you have written enough tests.

To run Jest with code coverage, simply add the coverage flag when you run the jest command:

npm test -- --coverage

<h3>ReactDOM</h3>
<ul>
  <li>ReactDOM.render: Renders html directly in the browser</li>
  <li>ReactDOM.renderToString: Renders html as a string, this allows us to render UI on the server.</li>
</ul>

<h3>Render Prop</h3>
Render props are exactly what they sound like, they are properties that are rendered. This can mean components that are sent as properties that are rendered when specific conditions are met, or it can mean function properties that return components that will be rendered. In the second case, when they are functions, data can be passed as arguments and used when rendering the returned component.

A render prop can contain a component to render when a particular condition has been met.

<h1>Virtual DOM vs Actual DOM</h1>
<i>DOM stands for Document Object Model and is an abstraction of a structured text. For web developers, this text is an HTML code, and the DOM is simply called HTML DOM. Elements of HTML become nodes in the DOM.</i>

The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation.

“virtual DOM” is more of a pattern than a specific technology.

In React, for every DOM object, there is a corresponding “virtual DOM object.” A virtual DOM object is a representation of a DOM object, like a lightweight copy. A virtual DOM object has the same properties as a real DOM object, but it lacks the real thing’s power to directly change what’s on the screen.

<h3>Diffing</h3>
When you render a JSX element, every single virtual DOM object gets updated.

This sounds incredibly inefficient, but the cost is insignificant because the virtual DOM can update so quickly.

Once the virtual DOM has updated, React compares the virtual DOM with a virtual DOM snapshot that was taken right before the update.

By comparing the new virtual DOM with a pre-update version, React figures out exactly which virtual DOM objects have changed. This process is called “diffing.”

Once React knows which virtual DOM objects have changed, then React updates those objects, and only those objects, on the real DOM.

<h3>ReactElement</h3>

This is the primary type in React.

A ReactElement is a light, stateless, immutable, virtual representation of a DOM Element.

ReactElements lives in the virtual DOM. They make the basic nodes here. Their immutability makes them easy and fast to compare and update. This is the reason of great React performance.

What can be a ReactElement? Almost every HTML tag - div, table, strong…

Once defined, ReactElements can be render into the “real” DOM. This is the moment when React ceases to control the elements. They become slow, boring DOM nodes.

ReactElements are the basic items in React-ish virtual DOM. However, they are stateless, therefore don’t seem to be very helpful for us, the programmers.

<h3>ReactComponent</h3>

What differs ReactComponent from ReactElement is - ReactComponents are stateful.

ReactComponents turned out to be a great tool for designing dynamic HTML. They don’t have the access to the virtual DOM, but they can be easily converted to ReactElements.

Whenever a ReactComponent is changing the state, we want to make as little changes to the “real” DOM as possible. So this is how React deals with it. The ReactComponent is converted to the ReactElement. Now the ReactElement can be inserted to the virtual DOM, compared and updated fast and easily. How exactly - well, that’s the job of the diff algorithm. The point is - it’s done faster than it would be in the “regular” DOM.

When React knows the diff - it’s converted to the low-level (HTML DOM) code, which is executed in the DOM. This code is optimised per browser.

<h3>JSX</h3>
When we pass the array of elements to a component, we need to surround it with curly braces. This is called a JavaScript expression, and we must use these when passing JavaScript values to components as properties. <b>Component properties will take two types: either a string or a JavaScript expression. JavaScript expressions can include arrays, objects, and even functions. In order to include them, you must surround them in curly braces.</b>

JSX is JavaScript, so you can incorporate JSX directly inside of JavaScript functions.

JSX looks clean and readable, but it can’t be interpreted with a browser. All JSX must be converted into createElement calls or factories. Luckily, there is an excellent tool for this task: Babel.

JavaScript is an interpreted language: the browser interprets the code as text, so there is no need to compile JavaScript. However, not all browsers support the latest JavaScript syntax, and no browser supports JSX syntax. Since we want to use the latest features of JavaScript along with JSX, we are going to need a way to convert our fancy source code into something that the browser can interpret. This process is called compiling, and it is what Babel is designed to do.

<h3>React Fragments</h3>
React will not render two or more adjacent or sibling elements as a component, so we used to have to wrap these in an enclosing tag like a div. This led to a lot of unnecessary tags being created though, a bunch of wrappers without much purpose. If we use a React Fragment, we can mimic the behavior of a wrapper without actually creating a new tag.

<h4>NOTE:</h4> <b>react-scripts</b> was also created by Facebook and is where the real magic happens. It installs Babel, ESLint, webpack, and more, so that you don’t have to configure them manually.

<h3>Pure Component</h3>
A Pure Component is a function component that does not contain state and will render the same user interface given the same props. In React, a Pure Component is a Component that always renders the same output, given the same properties.

<h1>React Hook Flow</h1>

![alt text](https://raw.githubusercontent.com/donavon/hook-flow/master/hook-flow.png)
