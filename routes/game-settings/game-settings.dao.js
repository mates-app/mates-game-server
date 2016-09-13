'use strict'
let mongoose = require('mongoose')
let GameSettings = require('./game-settings.model')


module.exports.create = (req, res, next) =>{

    if (!mongoose.Types.ObjectId.isValid(req.body.gameId)) {
        return next(new Error('You must supply a GameScore ID'))
    }

    let gameSettings = new GameSettings(req.body)

    gameSettings.save((err) => {
        if (err) return next(err)

        req.gameSettings = gameSettings

        next()
    })
}

module.exports.findById = (req, res, next) => {
    GameSettings.findById(req.params.id, (err, gameSettings) =>{
        console.info(req.params.id)

        if(err){
            return next(err)
        }

        req.gameSettings = gameSettings

        next()

    })
}

module.exports.findPublics = (req, res, next) => {

    let query = {
        isMultiPlayer: req.params.type === 'multi-player'
    }


    GameSettings.find(query, (err, gameSettings) =>{
        console.info(query)

        if(err){
            return next(err)
        }

        req.gameSettings = gameSettings

        next()

    })
}


module.exports.pushScore = (req, res, next) => {
    let gameSettingsId = req.body.gameSettingsId
    let userId = req.body.userId
    let scoreToAdd = req.body.scoreToAdd
    console.log('pushScore', gameSettingsId, userId, scoreToAdd)

    if (!mongoose.Types.ObjectId.isValid(gameSettingsId)) {
        console.log('error gameId')
        return next(new Error('You must supply a GameConfig ID'))
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.log('error userId')
        return next(new Error('You must supply a User ID'))
    }

    let query = {
        _id : gameSettingsId
    }

    GameSettings.findOne(gameSettingsId, (err, gameScore) =>{

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


}













