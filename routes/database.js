'use strict'
let mongoose = require('mongoose');
let q = require('q')



let connect = (database) =>{
	let connectionString = `mongodb://localhost/${database || 'matesGame'}`

	mongoose.connect(connectionString);
	let GameConfig = require('./game-config/game-config.model')
	let db = mongoose.connection;

	db.on(
		'error', 
		console.error.bind(console, 'connection error:')
	);

	db.once('open', function() {
		console.log(`connected to database ${connectionString}`)
	});

}


let saveGameConfig = function(gameConfig){
	let deferred = q.defer()
	let model = new GameConfig(gameConfig)
	console.log('model', model)
	model.save((err, gameConfigSaved) =>{
		if (err) 
			console.error(err);    
		else
			console.log('game saved', gameConfigSaved)
		return deferred.resolve(gameConfigSaved)
	})
	return deferred.promise
}

let getGameConfig = function(id){
	let deferred = q.defer()

	GameConfig
		.where({'_id' : id})
		.findOne((err, gameConfig) => {
		if (err) 
			console.error(err);    
		else
			console.log('game restored', gameConfig)
		return deferred.resolve(gameConfig)
	})

	return deferred.promise
}

let getAllGameConfigs = () => {
	let deferred = q.defer()

	GameConfig
		.find((err, gameConfigs) => {
		if (err) 
			console.error(err);    
		else
			console.log('games restored', gameConfigs)
		return deferred.resolve(gameConfigs)
	})

	return deferred.promise
}


module.exports = {
	saveGameConfig 		: saveGameConfig,
	getGameConfig 		: getGameConfig,
	getAllGameConfigs 	: getAllGameConfigs,
	connect 			: connect
};
