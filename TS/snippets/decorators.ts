class Greeter {
  constructor(public name: string) { }
  sayHello() { console.log(`Hello ${this.name} `) };
}
const grt = new Greeter('John');
grt.sayHello();  // prints "Hello John"


// tsc --experimentalDecorators decorators.ts
type constructorMixin = { new(...args: any[]): {} };
function useSalutation(salutation: string) {
  return function <T extends constructorMixin> (target: T) {
    return class extends target {
     name: string;
     private message = 'Hello ' + salutation + this.name;
 
     sayHello() { console.log(`${this.message}`); }
    }
  }
}

@useSalutation("Mr. ")
class Greeter2 {
  constructor(public name: string) { }
  sayHello() { console.log(`Hello ${this.name} `) }
}
 
const grt2 = new Greeter2('Smith');
grt.sayHello();