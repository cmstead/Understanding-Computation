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
	},
	
	toValue: function () {
		return this.getvalue();
	},
	
	reducible: function () {
		return false;
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
		return this.getleft().toString() + ' + ' + this.getright().toString();
	},
	
	reducible: function () {
		return true;
	},
	
	reduce: function (environment) {
		var result;
		
		if (this.getleft().reducible()) {
			result = new AddClass(this.getleft().reduce(environment), this.getright());
		} else if (this.getright().reducible()) {
			result = new AddClass(this.getleft(), this.getright().reduce(environment));
		} else {
			result = new NumberClass(this.getleft().toValue() + this.getright().toValue());
		}
		
		return result;
	}
};

function addFactory (left, right) {
	return new AddClass(left, right);
}


function MultiplyClass (left, right) {
	var multiplyStruct = structFactory.build('left', 'right');
	
	multiplyStruct.setleft(left);
	multiplyStruct.setright(right);
	structFactory.extend(this, multiplyStruct);
}

MultiplyClass.prototype = {
	toString: function () {
		return this.getleft().toString() + ' * ' + this.getright().toString();
	},
	
	reducible: function () {
		return true;
	},
	
	reduce: function (environment) {
		var result;
		
		if (this.getleft().reducible()) {
			result = new MultiplyClass(this.getleft().reduce(environment), this.getright());
		} else if (this.getright().reducible()) {
			result = new MultiplyClass(this.getleft(), this.getright().reduce(environment));
		} else {
			result = new NumberClass(this.getleft().toValue() * this.getright().toValue());
		}
		
		return result;
	}
};

function multiplyFactory (left, right) {
	return new MultiplyClass(left, right);
}


function build (objectType) {
	var args = Array.prototype.slice.call(arguments, 1),
		objectTypes = {
			'add': addFactory,
			'multiply': multiplyFactory,
			'number': numberFactory
		};
	
	return objectTypes[objectType].apply(null, args);
}

module.exports = {
	build: build
};