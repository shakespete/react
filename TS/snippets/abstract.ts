/**
 * Why would you want to create a class that can’t be instantiated?
 * 
 * You may want to delegate the implementation of some methods to its
 * subclasses, and you want to make sure these methods will have specific
 * signatures.
 */

abstract class AbstractPerson {

  constructor(public name: string) { }; 

  changeAddress(newAddress: string ) {
    console.log(`Changing address to ${newAddress}`);
  }

  giveDayOff() {
    console.log(`Giving a day off to ${this.name}`);
  }

  promote(percent: number) {
    this.giveDayOff();
    this.increasePay(percent);
  }

  /**
   * If you want to create a descendant of the abstract class that can be
   * instantiated, you must implement all the abstract methods of the ancestor.
   */
  abstract increasePay(percent: number): void;
}

class Engineer extends AbstractPerson {
  increasePay(percent: number) {
    console.log(`Increasing the salary of ${this.name} by ${percent}%`);
  }
}

class Contractor extends AbstractPerson {
  increasePay(percent: number) {
    console.log(`Increasing the hourly rate of ${this.name} by ${percent}%`);
  }
}

const workers: AbstractPerson[] = [];

workers[0] = new Engineer('John');
workers[1] = new Contractor('Mary');

workers.forEach(worker => worker.promote(5));

/**
 * Because the descendants of Person don’t declare their own constructors,
 * the constructor of the ancestor will be invoked automatically when we
 * instantiate Employee and Contractor. If any of the descendants declared
 * its own constructor, we’d have to use super() to ensure that the constructor
 * of Person was invoked.
 */