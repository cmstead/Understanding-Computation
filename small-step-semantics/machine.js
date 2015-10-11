function Machine (statement, environment) {
	this.statement = statement;
	this.environment = environment;
}

Machine.prototype = {
	step: function () {
	var result = this.statement.reduce(this.environment);
		this.statement = result[0];
		this.environment = result[1];
	},
	
	run: function () {
		while(this.statement.reducible()){
			console.log(this.statement.toString());
			this.step();
		}
		
		console.log(this.statement.toString());
		return this.environment;
	}
};

module.exports = {
	build: function (statement, environment) {
		return new Machine(statement, environment);
	}
};