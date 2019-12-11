
// **********************************************
// get random number within a range
// **********************************************

function getRandomNumInRange (myLowerBound, myUpperBound) {

   return Math.floor (Math.random () * (myUpperBound - myLowerBound + 1)) + myLowerBound;

} // getRandomNumInRange

// **********************************************
// get random number from among a group of numbers
// **********************************************

function getRandomNumFromArray (myArray) {

   var increment = numberOptions[Math.round(Math.random())];
   return increment;

} // getRandomNumFromArray

// **********************************************
// convert an ASCII number to its character
// *********************************************/

function getChar (myNum) {

   return String.fromCharCode (myNum);

} // getChar

function getTimeStr (d) {

   var str = d.getHours() + ':';

   if (d.getMinutes() >= 0 && d.getMinutes() <= 9){
      str+='0';
   }
   str+=d.getMinutes() + ':';

   if (d.getSeconds() >= 0 && d.getSeconds() <= 9){
      str+='0';
   }
   str+=d.getSeconds();

   return str;

}