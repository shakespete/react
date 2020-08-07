

/**
 * Creating generic functions: The generic Pair class
 */

class Pair<K, V> {
  constructor(public key: K, public value: V) {}
}

function compare <K,V> (pair1: Pair<K,V>, pair2: Pair<K,V>): boolean {
    return pair1.key === pair2.key &&
           pair1.value === pair2.value;
}

let p1: Pair<number, string> = new Pair(1, "Apple");

let p2 = new Pair(1, "Orange");

// Comparing apples to oranges
console.log(compare<number, string>(p1, p2));  // prints false

let p3 = new Pair("first", "Apple");
let p4 = new Pair("first", "Apple");

// Comparing apples to apples
console.log(compare(p3, p4));  // prints true
console.log(compare(p3, p1));  // compile error


/**
 * Creating generic functions: Mapping string enums
 */

interface User { 
  name: string;
  role: UserRole;
}

enum UserRole {  
  Administrator = 'admin',
  Manager = 'manager'
}

function loadUser<T>(): T {  
  return JSON.parse('{ "name": "john", "role": "admin" }');
}

const user = loadUser<User>(); 

switch (user.role) {  
  case UserRole.Administrator: console.log('Show control panel'); break;
  case UserRole.Manager: console.log('Hide control panel'); break;
}


/**
 *  Enforcing the return type of higher-order functions
 */

type numFunc<T> = (arg: T) => (x: number) => number; 

const noArgFunc: numFunc<void> = () => (c: number) => c + 5;
const numArgFunc: numFunc<number> = (someValue: number) => (multiplier: number) => someValue * multiplier;
const stringArgFunc: numFunc<string> = (someText: string) => (padding: number) => someText.length + padding;
const createSumString: numFunc<number> = () => (x: number) => 'Hello';  //error
