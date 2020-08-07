var Direction;
(function (Direction) {
    Direction[Direction["FtoC"] = 0] = "FtoC";
    Direction[Direction["CtoF"] = 1] = "CtoF";
})(Direction || (Direction = {}));
function convertTemperature(temp, fromTo) {
    return (Direction.FtoC === fromTo) ?
        (temp - 32) * 5.0 / 9.0 :
        temp * 9.0 / 5.0 + 32;
}
console.log("70F is " + convertTemperature(70, Direction.FtoC) + "C");
console.log("21C is " + convertTemperature(21, Direction.CtoF) + "F");
/**
 * Reversing numeric enums
 *
 * If you know the value of a numeric enum, you can find the name of that enum member.
 * For example, you might have a function that returns the weekday number, and you’d
 * like to print its name. By using this value as an index, you can retrieve the name of the day.
 */
var Weekdays;
(function (Weekdays) {
    Weekdays[Weekdays["Monday"] = 1] = "Monday";
    Weekdays[Weekdays["Tuesday"] = 2] = "Tuesday";
    Weekdays[Weekdays["Wednesday"] = 3] = "Wednesday";
    Weekdays[Weekdays["Thursday"] = 4] = "Thursday";
    Weekdays[Weekdays["Friday"] = 5] = "Friday";
    Weekdays[Weekdays["Saturday"] = 6] = "Saturday";
    Weekdays[Weekdays["Sunday"] = 7] = "Sunday";
})(Weekdays || (Weekdays = {}));
console.log(Weekdays[3]);
