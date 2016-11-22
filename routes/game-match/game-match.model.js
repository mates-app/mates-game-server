/**
 * Created by josecullen on 11/09/16.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var gameMatchSchema = {
    gameId: {type: Schema.Types.ObjectId, ref: 'GameConfig' },
    name : String,
    isPublic: {type: Boolean, default: false},
    isMultiPlayer: {type: Boolean, default: false},
    isStarted: {type: Boolean, default: false},
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    scores: [{
        user: {type: Schema.Types.ObjectId, ref: 'User' },
        score: Number
    }]
}

module.exports = mongoose.model('GameMatch', gameMatchSchema)



