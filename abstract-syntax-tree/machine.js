function Machine (expression, environment) {
	this.expression = expression;
	this.environment = environment;
}

Machine.prototype = {
	step: function () {
		this.expression = this.expression.reduce(this.environment);
	},
	
	run: function () {
		while(this.expression.reducible()){
			console.log(this.expression.toString());
			this.step();
		}
		
		console.log(this.expression.toString());
	}
};

module.exports = {
	build: function (expression, environment) {
		return new Machine(expression, environment);
	}
};