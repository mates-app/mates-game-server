/**
 * Created by josecullen on 13/09/16.
 */
'use strict'
let q = require('q')
var async = require('async')
var matesEngine = require('../mates-engine-connection')

module.exports.createGame = (req, res, next) => {
    console.log('creating Game')

    let gameConfig = req.gameConfig

    let game = {
        "gameId": gameConfig._id,
        "name" : gameConfig.name,
        "levels": []
    }

    async.eachOfSeries(gameConfig.levels, (level, index, callback) =>{

        createGameProblems(level.gameProblems)
            .then((gameProblems) =>{

                game.levels.push({
                    "name" : level.name,
                    "gameProblems" : gameProblems,
                    "scoreConfig" : level.scoreConfig
                })
                callback()
            })

    }, () => {
        req.game = game
        next()
    })

}

let createGameProblems = (gameConfigs) =>{
    let deferred = q.defer()

    let gameProblems = []

    async.eachOfSeries(gameConfigs, (gameConfig, index, callback) => {
        console.log('creating game problem ', index)
        matesEngine
            .createProblem(gameConfig)
            .then(function(gameProblem){
                console.log('game problem created')
                gameProblem.forEach((problem) => gameProblems.push(problem))

                callback()

            })

    }, () => {
        deferred.resolve(gameProblems)
    })

    return deferred.promise
}
