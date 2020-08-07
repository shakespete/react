enum Direction {
  FtoC,
  CtoF
}
 
function convertTemperature(temp: number, fromTo: Direction): number {
  return (Direction.FtoC === fromTo) ?
             (temp - 32) * 5.0/9.0:
             temp * 9.0 / 5.0 + 32;
}
 
console.log(`70F is ${convertTemperature(70, Direction.FtoC)}C`);
console.log(`21C is ${convertTemperature(21, Direction.CtoF)}F`);


/**
 * Reversing numeric enums
 * 
 * If you know the value of a numeric enum, you can find the name of that enum member.
 * For example, you might have a function that returns the weekday number, and you’d
 * like to print its name. By using this value as an index, you can retrieve the name of the day.
 * 
 * This isn’t possible with const enum as they are not represented in the generated JavaScript code.
 */
enum Weekdays {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}

console.log(Weekdays[3]);