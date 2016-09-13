/**
 * Created by josecullen on 11/09/16.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var gameSettingsSchema = {
    gameId: {type: Schema.Types.ObjectId, ref: 'GameConfig' },
    name : String,
    isPublic: Boolean,
    isMultiPlayer: Boolean,
    isStarted: Boolean,
    scores: [{
        user: {type: Schema.Types.ObjectId, ref: 'User' },
        score: Number
    }]
}

module.exports = mongoose.model('GameSettings', gameSettingsSchema)



