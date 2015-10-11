'use strict';

var structFactory = require('./struct');

function NoOpClass () {}

NoOpClass.prototype = {
	toString: function () {
		return 'no-op';
	},
	
	reducible: function () {
		return false;
	},
	
	equal: function (object) {
		return object instanceof NoOpClass;
	}
};

function noopFactory () {
	return new NoOpClass();
}


function AssignClass (name, expression) {
	var assignStruct = structFactory.build('name', 'expression');
	
	assignStruct.setname(name);
	assignStruct.setexpression(expression);
	structFactory.extend(this, assignStruct);
}

AssignClass.prototype = {
	toString: function () {
		return this.getname() + ' = ' + this.getexpression().toString();
	},
	
	reducible: function () {
		return true;
	},
	
	reduce: function (environment) {
		var result,
			newEnvironment = {},
			expression = this.getexpression(),
			name = this.getname();
		
		if (expression.reducible()) {
			result = [new AssignClass(this.getname(), expression.reduce(environment)), environment];
		} else {
			newEnvironment[name] = expression;
			result = [new NoOpClass(), environment.merge(newEnvironment)];
		}
		
		return result;
	}
};

function assignFactory (name, expression) {
	return new AssignClass(name, expression);
}

function build (statementType) {
	var args = Array.prototype.slice.call(arguments, 1),
		statementFactories = {
			'assign': assignFactory,
			'noop': noopFactory
		};
	
	return statementFactories[statementType].apply(null, args);
}

module.exports = {
	build: build
};