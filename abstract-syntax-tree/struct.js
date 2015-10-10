'use strict';

function getFactory (context, key) {
	function getter () {
		return context[key];
	}
	
	return getter;
}

function setFactory (context, key) {
	function setter (value) {
		context[key] = value;
	}
	
	return setter;
}

function propertyBuilder (context, key) {
	var getter = 'get' + key,
		setter = 'set' + key,
		internalKey = ':' + key;
	
	context[internalKey] = null;
	context[getter] = getFactory(context, internalKey);
	context[setter] = setFactory(context, internalKey);
	
	return context;
}

function structBuilder (context, keys) {
	
	keys.filter(function (value) { return typeof value === 'string'; })
		.reduce(propertyBuilder, context);
	
	return context;
}

function Struct (keys) {
	structBuilder(this, keys);
}

function attachProperty (struct, context, key) {
	context[key] = struct[key];
	return context;
}

module.exports = {
	build: function () {
		var keys = Array.prototype.slice.call(arguments, 0);
		return new Struct(keys);
	},
	
	extend: function (context, struct) {
		Object.keys(struct).reduce(attachProperty.bind(null, struct), context);
		return context;
	}
};