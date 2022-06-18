# TypeScript

## Types


<p align="center">
  <img src="https://github.com/shakespete/react/blob/dev/TS/images/type_hierarchy.png" width="700" height="auto">
</p>

### Union and Intersection

If you have two things A and B, the union of those things is their sum (everything in A or B or both), and the intersection is what they have in common (everything in both A and B).

<p align="center">
  <img src="https://github.com/shakespete/react/blob/dev/TS/images/union_intersection.png" width="700" height="auto">
</p>


## Objects

JavaScript is generally structurally typed, so TypeScript favors that style of programming over a nominally typed style.
**Structural Typing** is a style of programming where you just care that an object has certain properties, and not what its name is (*nominal typing*).

```
let a: {
  b: number
  c?: string
  [key: number]: boolean
}
```

The [key: T]: U syntax is called an **index signature**, and this is the way you tell TypeScript that the given object might contain more keys. The way to read it is, “For this object, all keys of type T must have values of type U.” Index signatures let you safely add more keys to an object, in addition to any keys that you explicitly declared.

There is one rule to keep in mind for index signatures: the index signature key’s type (T) must be assignable to either number or string.

Also note that you can use any word for the index signature key’s name—it doesn’t have to be key.

Object literal syntax says, “Here is a thing that has this shape.” The thing might be an object literal, or it might be a class. object is a little narrower than any, but not by much. object doesn’t tell you a lot about the value it describes, just that the value is a JavaScript object (and that it’s not null).

Object literal notation has one special case: empty object types ({}). Every type—except null and undefined—is assignable to an empty object type, which can make it tricky to use. Try to avoid empty object types when possible.

## Functions

### Declaring Functions

```
// Named function
function greet(name: string) {
  return 'hello ' + name
}

// Function expression
let greet2 = function(name: string) {
  return 'hello ' + name
}

// Arrow function expression
let greet3 = (name: string) => {
  return 'hello ' + name
}

// Shorthand arrow function expression
let greet4 = (name: string) =>
  'hello ' + name

// Function constructor
let greet5 = new Function('name', 'return "hello " + name')
```

A **parameter** is a piece of data that a function needs to run, declared as part of a function declaration. Also called a formal parameter.

An **argument** is a piece of data that you passed to a function when invoking it. Also called an actual parameter.


### Rest Params

Sometimes, you might opt for a variadic function API—one that takes a variable number of arguments—instead of a fixed-arity API that takes a fixed number of arguments.

So, how can we safely type variadic functions?

Rest parameters to the rescue! Instead of resorting to the unsafe arguments magic variable, we can instead use rest parameters to safely make our sum function accept any number of arguments:

```
function sumVariadicSafe(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0)
}

sumVariadicSafe(1, 2, 3) // evaluates to 6
```


### Call Signatures

```
(a: number, b: number) => number
```

This is TypeScript’s syntax for a function’s type, or call signature (also called a type signature). When you pass functions around as arguments, or return them from other functions, this is the syntax you’ll use to type them.

If you have a call signature, how can you declare a function that implements that signature? You simply combine the call signature with a function expression that implements it.

```
type Log = (message: string, userId?: string) => void

let log: Log = (
  message,
  userId = 'Not signed in'
) => {
  let time = new Date().toISOString()
  console.log(time, message, userId)
}
```


### Generic Type Parameter

A placeholder type used to enforce a type-level constraint in multiple places. Also known as polymorphic type parameter.

```
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[]
}
```

What we’ve done here is say: “This function filter uses a generic type parameter T; we don’t know what this type will be ahead of time, so TypeScript if you can infer what it is each time we call filter that would be swell.”

TypeScript infers T from the type we pass in for array. Once TypeScript infers what T is for a given call to filter, it substitutes that type in for every T it sees. T is like a placeholder type, to be filled in by the typechecker from context; it parameterizes Filter’s type, which is why we call it a generic type parameter.

The funny-looking angle brackets, <>, are how you declare generic type parameters (think of them like the type keyword, but for generic types); where you place the angle brackets scopes the generics (there are just a few places you can put them), and TypeScript makes sure that within their scope, all instances of the generic type parameters are eventually bound to the same concrete types. Because of where the angle brackets are in this example, TypeScript will bind concrete types to our generic T when we call filter. And it will decide which concrete type to bind to T depending on what we called filter with. You can declare as many comma-separated generic type parameters as you want between a pair of angle brackets.

Like a function’s parameter gets re-bound every time you call that function, so each call to filter gets its own binding for T:

```
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[]
}

let filter: Filter = (array, f) => // ...

// (a) T is bound to number
filter([1, 2, 3], _ => _ > 2)

// (b) T is bound to string
filter(['a', 'b'], _ => _ !== 'b')

// (c) T is bound to {firstName: string}
let names = [
  {firstName: 'beth'},
  {firstName: 'caitlyn'},
  {firstName: 'xin'}
]
filter(names, _ => _.firstName.startsWith('b'))
```

How many generics do you need? How do you declare your generics, and scope them to the map function? What should the types of array, f, and the return value be?

```
function map<T, U>(array: T[], f: (item: T) => U): U[] {
  let result = []
  for (let i = 0; i < array.length; i++) {
    result[i] = f(array[i])
  }
  return result
}
```

We need exactly two generic types: T for the type of the array members going in, and U for the type of the array members going out. We pass in an array of Ts, and a mapping function that takes a T and maps it to a U. Finally, we return an array of Us.


### Generic Type Interface
```
function map<T, U>(array: T[], f: (item: T) => U): U[] {
  // ...
}

map(
  ['a', 'b', 'c'],  // An array of T
  _ => _ === 'a'    // A function that returns a U
)
```

Explicit annotations for generics are all-or-nothing; either annotate every required generic type, or none of them.


### Generic Type Aliases
```
type MyEvent<T> = {
  target: T
  type: string
}

function triggerEvent<T>(event: MyEvent<T>): void {
  // ...
}

triggerEvent({ // T is Element | null
  target: document.querySelector('#myButton'),
  type: 'mouseover'
})
```

1. We call triggerEvent with an object.
2. TypeScript sees that according to our function’s signature, the argument we passed has to have the type MyEvent<T>. It also notices that we defined MyEvent<T> as {target: T, type: string}.
3. TypeScript notices that the target field of the object we passed is document.querySelector('#myButton'). That implies that T must be whatever type document.querySelector('#myButton') is: Element | null. So T is now bound to Element | null.
4. TypeScript goes through and replaces every occurrence of T with Element | null.
5. TypeScript checks that all of our types satisfy assignability. They do, so our code typechecks.


---
Sources:
- Programming TypeScript by Boris Cherny
