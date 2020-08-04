var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AbstractPerson = /** @class */ (function () {
    function AbstractPerson(name) {
        this.name = name;
    }
    ;
    AbstractPerson.prototype.changeAddress = function (newAddress) {
        console.log("Changing address to " + newAddress);
    };
    AbstractPerson.prototype.giveDayOff = function () {
        console.log("Giving a day off to " + this.name);
    };
    AbstractPerson.prototype.promote = function (percent) {
        this.giveDayOff();
        this.increasePay(percent);
    };
    return AbstractPerson;
}());
var Engineer = /** @class */ (function (_super) {
    __extends(Engineer, _super);
    function Engineer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Engineer.prototype.increasePay = function (percent) {
        console.log("Increasing the salary of " + this.name + " by " + percent + "%");
    };
    return Engineer;
}(AbstractPerson));
var Contractor = /** @class */ (function (_super) {
    __extends(Contractor, _super);
    function Contractor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Contractor.prototype.increasePay = function (percent) {
        console.log("Increasing the hourly rate of " + this.name + " by " + percent + "%");
    };
    return Contractor;
}(AbstractPerson));
var workers = [];
workers[0] = new Engineer('John');
workers[1] = new Contractor('Mary');
workers.forEach(function (worker) { return worker.promote(5); });
/**
 * Because the descendants of Person don’t declare their own constructors,
 * the constructor of the ancestor will be invoked automatically when we
 * instantiate Employee and Contractor. If any of the descendants declared
 * its own constructor, we’d have to use super() to ensure that the constructor
 * of Person was invoked.
 */ 
