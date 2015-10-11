'use strict';

var core = require('./core'),
	math = require('./math'),
	statements = require('./statements'),

	environment = require('./environment'),
	machineFactory = require('./machine'),
	
	expression = math.build('add', 
					math.build('multiply',
							   core.build('variable', 'x'),
							   core.build('variable', 'y')),
					math.build('multiply',
							   math.build('number', 10),
							   math.build('number', 7))),

	environment = environment.build({
		x: math.build('number', 2),
		y: math.build('number', 3)
	});

console.log(machineFactory.build(
	statements.build('assign', 'z', expression),
	environment
).run());