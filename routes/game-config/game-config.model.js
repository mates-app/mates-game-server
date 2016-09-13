/**
 * Created by josecullen on 12/09/16.
 */
var mongoose = require('mongoose');

var extraScore = mongoose.Schema({
    "name": String,
    "extraTime": Number,
    "extraScore": Number,
    "thresholdTime": Number
})

var scoreConfig = mongoose.Schema({
    "baseScore": Number,
    "preCount": Number,
    "withTime": Boolean,
    "extras": [extraScore]
})

var gameProblemConfig = mongoose.Schema({

})

var levelConfig = mongoose.Schema({
    "name": String,
    "gameProblems": [{}],
    'scoreConfig': scoreConfig
})

var gameConfig = mongoose.Schema({
    "name": String,
    "isPublic" : {type: Boolean, default : true},
    "levels": [levelConfig]
})

module.exports = mongoose.model('GameConfig', gameConfig)
