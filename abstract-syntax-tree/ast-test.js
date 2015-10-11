'use strict';

var core = require('./core'),
	math = require('./math'),
	machineFactory = require('./machine'),
	myAddition = math.build('add', 
					math.build('multiply',
							   core.build('variable', 'x'),
							   core.build('variable', 'y')),
					math.build('multiply',
							   math.build('number', 10),
							   math.build('number', 7)));


machineFactory.build(
	myAddition,
	{
		x: math.build('number', 2),
		y: math.build('number', 3)
	}
).run();