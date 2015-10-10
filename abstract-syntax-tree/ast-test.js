'use strict';

var math = require('./math'),
	myNumber = math.build('number', 5),
	myAddition = math.build('add', math.build('number', 2), math.build('number', 3));

console.log(myNumber);
console.log(myAddition);