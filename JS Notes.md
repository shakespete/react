<h1>JavaScript</h1>

<ul>
  <li>JavaScript always passes by value. However, with objects (Object, Array, Function), the value is a reference to the object.</li>
  <li>Javascript is a single threaded programming language, which means it has a single call stack and can do one thing at a time.</li>
  <li>In JavaScript, function arguments are references to the actual data.</li>
  <li>In JavaScript, arrays, objects, and functions are the same only when they are the exact same instance.</li>
  <li>Isomorphic applications are applications that can be rendered on multiple platforms. Universal code means that the exact same code can run in multiple environments.</li>
  <li>Referential equality === (also called identity) means that the pointers for two objects are the same. That is to say the objects are contained in the same memory location which leads us to the fact that pointers reference to the same object. <strong>Identity</strong> determines whether two objects share the same memory address</li>
  <li>Structural equality ==, in its turn, means that two objects have equivalent content. <strong>Equality</strong> determines if two objects contain the same state.</li>
  <li>When we write synchronous JavaScript code, we’re providing a list of instructions that execute immediately in order.</li>
  <li>JavaScript asynchronous tasks do not block the main thread. JavaScript is free to do something else while we wait for the API to return data.</li>
  <li>Parameters are the variable names of the function definition, while arguments are the values given to a function when it is invoked.</li>
</ul>

<h3>Function Declarations</h3>
A function declaration or function definition below starts with the function keyword which is followed by the name of the function.

<h3>Function Expressions</h3>
A function expression involves creating the function as a variable. One thing to be aware of when making a decision between a function declaration and a function expression is that <b>function declarations are hoisted and function expressions are not</b>. In other words, you can invoke a function before you write a function declaration. You can not invoke a function created by a function expression.

<h3>List Matching</h3>
List matching occurs when commas take the place of elements that should be skipped.

```
const [, , thirdAnimal] = ["Horse", "Mouse", "Cat"];
console.log(thirdAnimal); // Cat
```

<h1>Functional Programming</h1>

<b>A function is considered a first-class member when it can be declared as a variable and sent to functions as an argument. These functions can even be returned from functions. This means that functions can do the same things that variables can do.</b>

<h3>Pure Functions</h3>
A pure function is a function that returns a value that is computed based on its arguments. Pure functions take at least one argument and always return a value or another function. They do not cause side effects, set global variables, or change anything about application state. They treat their arguments as immutable data. A pure function is a function that satisfies these two conditions:

<ol>
  <li>Given the same input, the function returns the same output.</li>
  <li>The function doesn't cause side effects outside of the function's scope (i.e. mutate data outside the function or data supplied to the function).</li>
</ol>

Pure functions can mutate local data within the function as long as it satisfies the two conditions above.

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

The ages array has been reduced into a single value: the maximum age, 64. reduce takes two arguments: a callback function and an original value. In this case, the original value is 0, which sets the initial maximum value to 0. The callback is invoked once for every item in the array. The first time this callback is invoked, age is equal to 21, the first value in the array, and max is equal to 0, the initial value. The callback returns the greater of the two numbers, 21, and that becomes the max value during the next iteration. Each iteration compares each age against the max value and returns the greater of the two. Finally, the last number in the array is compared and returned from the previous callback.

```
const colors = [
  {
    id: "xekare",
    title: "rad red",
    rating: 3
  },
  {
    id: "jbwsof",
    title: "big blue",
    rating: 2
  },
  {
    id: "prigbj",
    title: "grizzly grey",
    rating: 5
  },
  {
    id: "ryhbhsl",
    title: "banana",
    rating: 1
  }
];

const hashColors = colors.reduce((hash, { id, title, rating }) => {
  hash[id] = { title, rating };
  return hash;
}, {});

console.log(hashColors);

// {
//  "xekare": {
//    title:"rad red",
//    rating:3
//  },
//  "jbwsof": {
//    title:"big blue",
//    rating:2
//  },
//  "prigbj": {
//    title:"grizzly grey",
//    rating:5
//  },
//  "ryhbhsl": {
//    title:"banana",
//    rating:1
//  }
// }
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

<h1>General</h1>

<h3>expression vs statement</h3>
<ul>
  <li>Expression: produces a value. They can be passed around to functions because the interpreter replaces them with the value they resolve to.</li>
  <li>Statement: performs an action. Statements appear as instructions that do something but don't produce values.</li>
  <li>Expression statement: produces a value and performs an action</li>
</ul>

<strong>Rule of thumb:</strong> If you can print it or assign it to a variable, it’s an expression. If you can’t, it’s a statement.


<h3>Saving Data Locally</h3>
We can save data locally to the browser using the Web Storage API. Data can be saved by either using the window.localStorage or window.sessionStorage objects. The sessionStorage API only saves data for the user’s session. Closing the tabs or restarting the browser will clear any data saved to sessionStorage. On the other hand, localStorage will save data indefinitely until you remove it. Loading data from web storage, saving data to web storage, stringifying data, and parsing JSON strings… all of these tasks are synchronous.
