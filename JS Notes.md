<h1>JavaScript</h1>

<ul>
  <li>JavaScript always passes by value. However, with objects (Object, Array, Function), the value is a reference to the object.</li>
  <li>In JavaScript, arrays, objects, and functions are the same only when they are the exact same instance.</li>
  <li>Isomorphic applications are applications that can be rendered on multiple platforms. Universal code means that the exact same code can run in multiple environments.</li>
</ul>

<h3>Function Declarations</h3>
A function declaration or function definition below starts with the function keyword which is followed by the name of the function.

<h3>Function Expressions</h3>
A function expression involves creating the function as a variable. One thing to be aware of when making a decision between a function declaration and a function expression is that <b>function declarations are hoisted and function expressions are not</b>. In other words, you can invoke a function before you write a function declaration. You can not invoke a function created by a function expression.

<h1>Functional Programming</h1>

<b>A function is considered a first-class member when it can be declared as a variable and sent to functions as an argument. These functions can even be returned from functions. This means that functions can do the same things that variables can do.</b>

<h3>Pure Functions</h3>
A pure function is a function that returns a value that is computed based on its arguments. Pure functions take at least one argument and always return a value or another function. They do not cause side effects, set global variables, or change anything about application state. They treat their arguments as immutable data.

<h3>Array.filter</h3>
Array.filter is a built-in JavaScript function that produces a new array from a source array. This function takes a predicate as its only argument. A predicate is a function that always returns a Boolean value: true or false. Array.filter invokes this predicate once for every item in the array. That item is passed to the predicate as an argument and the return value is used to decide if that item shall be added to the new array.

```
const schools = ["Yorktown", "Washington & Lee", "Wakefield"];

const wSchools = schools.filter(school => school[0] === "W");

console.log(wSchools);
// ["Washington & Lee", "Wakefield"]
```

<h3>Array.map</h3>
Array.map method takes a function as its argument. This function will be invoked once for every item in the array, and whatever it returns will be added to the new array.  The map function can produce an array of objects, values, arrays, other functions—any JavaScript type.

```
const highSchools = schools.map(school => `${school} High School`);

console.log(highSchools.join("\n"));
// Yorktown High School
// Washington & Lee High School
// Wakefield High School

console.log(schools.join("\n"));
// Yorktown
// Washington & Lee
// Wakefield
```

<h3>Object.keys</h3>
Object.keys is a method that can be used to return an array of keys from an object.

```
const schools = {
  Yorktown: 10,
  "Washington & Lee": 2,
  Wakefield: 5
};

const schoolArray = Object.keys(schools).map(key => ({
  name: key,
  wins: schools[key]
}));

console.log(schoolArray);
// [
//  {
//    name: "Yorktown",
//    wins: 10
//  },
//  {
//    name: "Washington & Lee",
//    wins: 2
//  },
//  {
//    name: "Wakefield",
//    wins: 5
//  }
// ]
```

<h3>Array.reduce</h3>
The reduce and reduceRight functions can be used to transform an array into any value, including a number, string, boolean, object, or even a function. reduce takes two arguments: a callback function and an original value. The callback is invoked once for every item in the array. Array.reduceRight works the same way as Array.reduce; the difference is that it starts reducing from the end of the array rather than the beginning.

```
const ages = [21, 18, 42, 40, 64, 63, 34];

const maxAge = ages.reduce((max, age) => {
  console.log(`${age} > ${max} = ${age > max}`);
  if (age > max) {
    return age;
  } else {
    return max;
  }
}, 0);

console.log("maxAge", maxAge);
// 21 > 0 = true
// 18 > 21 = false
// 42 > 21 = true
// 40 > 42 = false
// 64 > 42 = true
// 63 > 64 = false
// 34 > 64 = false
// maxAge 64
```

<h3>Higher-Order Functions</h3>
Higher-order functions are functions that can manipulate other functions. They can take functions in as arguments, or return functions, or both. The first category of higher-order functions are functions that expect other functions as arguments. Array.map, Array.filter, and Array.reduce all take functions as arguments. They are higher-order functions.

<h3>Composition</h3>
Functional programs break up their logic into small pure functions that are focused on specific tasks. Eventually, you will need to put these smaller functions together. Specifically, you may need to combine them, call them in series or parallel, or compose them into larger functions until you eventually have an application.

When it comes to composition, there are a number of different implementations, patterns, and techniques. One that you may be familiar with is chaining. In JavaScript, functions can be chained together using dot notation to act on the return value of the previous function.

A more elegant approach is to create a higher order function we can use to compose functions into larger functions.

```
const compose = (...fns) => arg =>
  fns.reduce((composed, f) => f(composed), arg);
```

The compose function is a higher order function. It takes functions as arguments and returns a single value.

compose takes in functions as arguments and returns a single function. In this implementation, the spread operator is used to turn those function arguments into an array called fns. A function is then returned that expects one argument, arg. When this function is invoked, the fns array is piped starting with the argument we want to send through the function. The argument becomes the initial value for composed and then each iteration of the reduced callback returns. Notice that the callback takes two arguments: composed and a function f. Each function is invoked with compose which is the result of the previous function’s output. Eventually, the last function will be invoked and the last result returned.


<h1>webpack</h1>
webpack is billed as a module bundler. A module bundler takes all of our different files (JavaScript, LESS, CSS, JSX, ESNext, and so on) and turns them into a single file. The two main benefits of bundling are modularity and network performance.

As of version 4.0.0, webpack does not require a configuration file to bundle your project. If you don’t include a config file, webpack will run the defaults to package your code. Using a config file though means that you’ll be able to customize your setup. Plus, this shows us some of the magic of webpack instead of hiding it away. The default webpack configuration file is always webpack.config.js.

The webpack.config.js file is just another module that exports a JavaScript literal object that describes the actions that webpack should take. The configuration file should be saved to the root folder of the project, right next to the index.js file

Wherever webpack finds an import statement, it will find the associated module in the filesystem and include it in the bundle. Webpack will follow this import tree and include all of these necessary modules in our bundle. Traversal through all of these files is creates what is called a dependency graph.


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

<h3>Saving Data Locally</h3>
We can save data locally to the browser using the Web Storage API. Data can be saved by either using the window.localStorage or window.sessionStorage objects. The sessionStorage API only saves data for the user’s session. Closing the tabs or restarting the browser will clear any data saved to sessionStorage. On the other hand, localStorage will save data indefinitely until you remove it. Loading data from web storage, saving data to web storage, stringifying data, and parsing JSON strings… all of these tasks are synchronous.