'use strict'
var mongoose = require('mongoose')
var GameSettings = require('./game-settings.model')


module.exports.create = (req, res, next) =>{

    console.log(req.body)

    if (!mongoose.Types.ObjectId.isValid(req.body.gameId)) {
        return next(new Error('You must supply a GameScore ID'))
    }

    let gameScore = new GameSettings(req.body)

    gameScore.save((err) => {
        if (err) return next(err)

        req.gameScore = gameScore

        next()
    })
}
