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

A union type describes a value that can be one of several types. We use the vertical bar (|) to separate each type, so number | string | boolean is the type of a value that can be a number, a string, or a boolean. A value with a union type (|) isn’t necessarily one specific member of your union; in fact, it can be both members at once.

An intersection type combines multiple types into one. This allows you to add together existing types to get a single type that has all the features you need.

### Types vs Interfaces

Like type aliases, interfaces are a way to name a type so you don’t have to define it inline. Type aliases and interfaces are mostly two syntaxes for the same thing (like function expressions and function declarations), but there are a few small differences.

**What are the differences between types and interfaces? There are three:**

1. The first is that type aliases are more general, in that their righthand side can be any type, including a type expression (a type, and maybe some type operators like & or |); for an interface, the righthand side must be a shape. For example, there is no way to rewrite the following type aliases as interfaces:
```
type A = number
type B = A | string
```

2. The second difference is that when you extend an interface, TypeScript will make sure that the interface you’re extending is assignable to your extension. For example:
```
interface A {
  good(x: number): string
  bad(x: number): string
}

interface B extends A {
  good(x: string | number): string
  bad(x: string): string  // Error TS2430: Interface 'B' incorrectly extends
}                         // interface 'A'. Type 'number' is not assignable
                          // to type 'string'.
```
This is not the case when you use intersection types: if you turn the interfaces above into type aliases and the extends into an intersection (&), TypeScript will do its best to combine your extension with the type it’s extending, resulting in an overloaded signature for bad instead of a compile-time error.

3. The third difference is that multiple interfaces with the same name in the same scope are automatically merged; multiple type aliases with the same name in the same scope will throw a compile-time error. This is a feature called declaration merging. (Declaration merging is TypeScript’s way of automatically combining multiple declarations that share the same name.)

### Subtypes and Supertypes

If you have two types A and B, and B is a subtype of A, then you can safely use a B anywhere an A is required:

<p align="center">
  <img src="https://github.com/shakespete/react/blob/dev/TS/images/sub_super.png" width="400" height="auto">
</p>

When we pass a shape with a property whose type is a supertype of the expected type, TypeScript complains.

TypeScript’s behavior is as follows: if you expect a shape, you can also pass a type with property types that are **subtypes** of their expected types, but you cannot pass a shape with property types that are supertypes of their expected types. When talking about types, we say that TypeScript shapes (objects and classes) are **covariant** in their property types. That is, for an object A to be assignable to an object B, each of its properties must be subtypes its corresponding property in B.

More generally, covariance is just one of four sorts of variance:

**Invariance**<br />You want exactly a T.

**Covariance**<br />You want a subtype of T.

**Contravariance**<br />You want a supertype of T.

**Bivariance**<br />You’re OK with either subtype of T or supertype of T.

In TypeScript, every complex type is covariant in its members—objects, classes, arrays, and function return types—with one exception: function parameter types, which are contravariant.

### Function Variance

A function A is a **subtype** of function B if A has the same or lower arity (number of parameters) than B and:

1. A’s *this* type either isn’t specified, or is a **supertype** of B’s *this* type.
2. Each of A’s parameters is a **supertype** of its corresponding parameter in B.
3. A’s return type is a **subtype** of B’s return type.

### Assignability

When TypeScript wants to answer the question “Is type A assignable to type B?” it follows a few simple rules. For non-enum types—like arrays, booleans, numbers, objects, functions, classes, class instances, and strings, including literal types—A is assignable to B if either of the following is true:

1. A is a **subtype** of B.
2. A is any.

For enum types created with the enum or const enum keywords, a type A is assignable to an enum B if either of these is true:

1. A is a member of enum B.
2. B has at least one member that’s a number, and A is a number.

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

Here's another example:

```
type ListProps<ItemType> = {
  items: ItemType[];
};

function list<ItemType>({ items }: ListProps<ItemType>) {
  for (const it of items) console.log(it);
}

const it1 = {
  items: [{ a: 'hello', b: 'there' }, { a: 'general', b: 'kenobi' }],
};

list(it1);
// { a: 'hello', b: 'there' }
// { a: 'general', b: 'kenobi' }

const it2 = {
  items: [
    { x: 'hello' },
    { x: 'there' }
  ],
};

list(it2);
// { x: 'hello' }
// { x: 'there' }

const it3 = {
  items: [
    'hello', 'there'
  ]
}

list(it3);
// hello
// there
```

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

Generally, TypeScript will bind concrete types to your generic when you use the generic: for functions, it’s when you call them; for classes, it’s when you instantiate them; and for type aliases and interfaces, it’s when you use or implement them.



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

### Bounded Polymorphism

Sometimes, saying “this thing is of some generic type T and that thing has to have the same type T" just isn’t enough. Sometimes you also want to say “the type U should be at least T.” We call this putting an upper bound on U.

```
type TreeNode = {
  value: string
}
type LeafNode = TreeNode & {
  isLeaf: true
}
type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode]
}
```

Now pause, and think about how you might write a mapNode function that takes a subtype of TreeNode and returns that same subtype. Passing in a LeafNode should return a LeafNode, an InnerNode should return an InnerNode, and a TreeNode should return a TreeNode.

```
function mapNode<T extends TreeNode>(
  node: T,
  f: (value: string) => string
): T {
  return {
    ...node,
    value: f(node.value)
  }
}
```

1. mapNode is a function that defines a single generic type parameter, T. T has an upper bound of TreeNode. That is, T can be either a TreeNode, or a subtype of TreeNode.
2. mapNode takes two parameters, the first of which is a node of type T. Because in 1 we said node extends TreeNode, if we passed in something that’s not a TreeNode—say, an empty object {}, null, or an array of TreeNodes—that would be an instant red squiggly. node has to be either a TreeNode or a subtype of TreeNode.
3. mapNode returns a value of type T. Remember that T might be a TreeNode, or any subtype of TreeNode.

Why did we have to declare T that way?

If we had typed T as just T (leaving off extends TreeNode), then mapNode would have thrown a compile-time error, because you can’t safely read node.value on an unbounded node of type T (what if a user passes in a number?).

If we had left off the T entirely and declared mapNode as (node: TreeNode, f: (value: string) => string) => TreeNode, then we would have lost information after mapping a node: a1, b1, and c1 would all just be TreeNodes.

By saying that T extends TreeNode, we get to preserve the input node’s specific type (TreeNode, LeafNode, or InnerNode), even after mapping it.

# React Typescript
  
## JSX.Element vs React.ReactNode

A technical explanation is that a valid React node is **not** the same thing as what is returned by React.createElement. Regardless of what a component ends up rendering, **React.createElement always returns an object**, which is the JSX.Element interface, but **React.ReactNode is the set of all possible return values of a component**.

JSX.Element -> Return value of React.createElement<br />
React.ReactNode -> Return value of a component

---
Sources:
- Programming TypeScript by Boris Cherny
