'use strict'
var mongoose = require('mongoose')
var GameScore = require('./game-score.model')

// module.exports.findByGameId = (req, res, next) => {

// 	GameScore.findById(GameScoreId, (err, GameScore) =>{
// 		if(err != null)
// 			return next(new Error('You must supply a GameScore ID'))
// 		else{
// 			req.GameScore = GameScore
// 			return next()
// 		} 			
// 	})

// }

module.exports.create = (req, res, next) =>{

	if (!mongoose.Types.ObjectId.isValid(req.body.gameId)) {
    	return next(new Error('You must supply a GameScore ID'))
  	}

	let gameScore = new GameScore({
		gameId : req.body.gameId,
		scores : []
	})

	gameScore.save((err) => {
	    if (err) return next(err)

	    req.gameScore = gameScore

	    next()
  	})	
}

module.exports.pushScore = (req, res, next) => {
	let gameId = req.body.gameId
	let userId = req.body.userId
	let scoreToAdd = req.body.scoreToAdd
	console.log('pushScore', gameId, userId, scoreToAdd)

	if (!mongoose.Types.ObjectId.isValid(gameId)) {
		console.log('error gameId')
    	return next(new Error('You must supply a GameConfig ID'))
  	}

  	if (!mongoose.Types.ObjectId.isValid(userId)) {
  		console.log('error userId')
    	return next(new Error('You must supply a User ID'))
  	}

  	let query = { 
  		gameId : gameId
  		// ,'scores.userId' : userId
	}

	GameScore.findOne(query, (err, gameScore) =>{
		if(err) {
			console.log('error finding')
			return next(err)
		}
		if(gameScore !== undefined && gameScore !== null){
			let score = gameScore.scores.find((score) => score.user.equals(userId))
			if(score){
				score.score += scoreToAdd
			}else{
				gameScore.scores.push({
					user : userId,
					score : scoreToAdd
				})
			}

			gameScore.save((err) =>{
				if(err) {
					console.log('error saving')
					return next(err)
				}
				next()
			})
		}else{
			next()
		}
	})

	
  	// let update = { 
  	// 	$inc : {
  	// 		'scores.$.score' : scoreToAdd
  	// 	}
  	// }

  	// let options = {
  	// 	upsert : true
  	// }

  	// GameScore.findOneAndUpdate(query, update, options, (err, gameScore) =>{
  	// 	if(err) return next(err)
  	// 	req.gameScore = gameScore
  	// 	next()
  	// })

}




module.exports.findByGameId = (req, res, next) => {
	let gameId = req.params.gameId || req.body.gameId
	console.log('gameId', gameId, req.params.gameId)
	if (!mongoose.Types.ObjectId.isValid(gameId)) {
    	return next(new Error('You must supply a GameScore ID'))
  	}

	GameScore
		.findOne({gameId : gameId})
		.populate({path : 'scores.user'})
		.exec((err, gameScore) =>{
			if(err) return err
			else req.gameScore = gameScore
			
			next()
		})
}

module.exports.remove = (req, res, next) => {
	let gameId = req.params.gameId || req.body.gameId
	console.log('gameId',gameId)

	if (!mongoose.Types.ObjectId.isValid(gameId)) {
    	return next(new Error('You must supply a GameScore ID'))
  	}

	GameScore.remove({ _id : gameId}, (err, doc) =>{
		if(err) return err		
		next()
	})
}
