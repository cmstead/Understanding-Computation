'use strict';

function Environment (initialState) {
	var initialTable = this.cleanObject(initialState);
	this.mergeObjects(this, initialTable);
}

Environment.prototype = {
	cleanObject: function (obj) {
		return typeof obj === 'object' && obj !== null ? obj : {};
	},
	
	mergeObjects: function (original, updated) {
		var updatedKeys = Object.keys(updated),
			key;
		
		while (updatedKeys.length > 0){
			key = updatedKeys.pop();
			original[key] = updated[key];
		}
		
		return original;
	},
	
	merge: function (updated) {
		var original = Object.create(this);
		return new Environment(this.mergeObjects(original, updated));
	}
};

function environmentFactory (initialState) {
	return new Environment(initialState);
}

module.exports = {
	build: environmentFactory
};