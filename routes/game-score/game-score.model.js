var mongoose = require('mongoose')
var Schema = mongoose.Schema

var gameScoreSchema = {
  gameId: {type: Schema.Types.ObjectId, ref: 'GameConfig' },
  scores: [
  	{ 
  		user: {type: Schema.Types.ObjectId, ref: 'User' },
  		score: Number
  	}]
}

module.exports = mongoose.model('GameScore', gameScoreSchema)
