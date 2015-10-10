'use strict';

var structFactory = require('./struct');

function NumberClass (value) {
	var numberStruct = structFactory.build('value');
	
	numberStruct.setvalue(value);
	structFactory.extend(this, numberStruct);
}

NumberClass.prototype = {
	toString: function () {
		return this.getvalue().toString();
	}
};

function numberFactory (value) {
	return new NumberClass(value);
}



function AddClass (left, right) {
	var addStruct = structFactory.build('left', 'right');
	
	addStruct.setleft(left);
	addStruct.setright(right);
	structFactory.extend(this, addStruct);
}

AddClass.prototype = {
	toString: function () {
		return this.getleft() + ' + ' + this.getright();
	}
};

function addFactory (left, right) {
	return new AddClass(left, right);
}


function build (objectType) {
	var args = Array.prototype.slice.call(arguments, 1),
		objectTypes = {
			'add': addFactory,
			'number': numberFactory
		};
	
	return objectTypes[objectType].apply(null, args);
}

module.exports = {
	build: build
};