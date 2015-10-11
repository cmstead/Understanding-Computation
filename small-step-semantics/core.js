'use strict';

var structFactory = require('./struct');

function VariableClass (name) {
	var coreStruct = structFactory.build('name');
	
	coreStruct.setname(name);
	structFactory.extend(this, coreStruct);
}

VariableClass.prototype = {
	toString: function () {
		return this.getname().toString();
	},
	
	reducible: function () {
		return true;
	},
	
	reduce: function (environment) {
		return environment[this.getname()];
	}
};

function variableFactory (name) {
	return new VariableClass(name);
}

function build (objectType) {
	var args = Array.prototype.slice.call(arguments, 1),
		objectTypes = {
			'variable': variableFactory
		};
	
	return objectTypes[objectType].apply(null, args);
}

module.exports = {
	build: build
};