'use strict'
let mongoose = require('mongoose');
let models = require('./models')
let q = require('q')
mongoose.connect('mongodb://localhost/test');

var GameConfig = mongoose.model('GameConfig', models.gameConfig);

let db = mongoose.connection;

db.on(
	'error', 
	console.error.bind(console, 'connection error:')
);

db.once('open', function() {
  console.log('connected to database')
});

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


module.exports = {
	saveGameConfig : saveGameConfig,
	getGameConfig : getGameConfig
};
