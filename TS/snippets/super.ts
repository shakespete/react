class Person {

  constructor(public firstName: string,
              public lastName: string,
              private age: number) { } 
 
  sellStock(symbol: string, numberOfShares: number) {
    console.log(`Selling ${numberOfShares} of ${symbol}`);
  }             
}

/**
 * If a method in a subclass wants to invoke a method with the same
 * name that’s defined in the superclass, it needs to use the super
 * keyword instead of this when referencing the superclass method.
 */

class Employee extends Person {  

  constructor (firstName: string, lastName: string,
                age: number, public department: string)  { 
        super(firstName, lastName, age); 
  }

  sellStock(symbol: string, shares: number) {
    super.sellStock(symbol, shares);

    this.reportToCompliance(symbol, shares);
  }  

  private reportToCompliance(symbol: string, shares: number) {
    console.log(`${this.lastName} from ${this.department} sold ${shares} shares of ${symbol}`);
  }
}

const empl = new Employee('Joe', 'Smith', 29, 'Accounting');
empl.sellStock('IBM', 100); 