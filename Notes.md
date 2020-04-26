
<h1><u>Virtual DOM vs Actual DOM</u></h1>

<i>*DOM stands for Document Object Model and is an abstraction of a structured text. For web developers, this text is an HTML code, and the DOM is simply called HTML DOM. Elements of HTML become nodes in the DOM.</i>

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
