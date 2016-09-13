'use strict'
var express = require('express');
var router = express.Router();
var matesEngine = require('./mates-engine-connection')
var async = require('async')
var db = require('./database')
let q = require('q')

router.all('/', function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

router.get('/v1/admin/game/:id', (req, res, next) => {
  console.log('request', req.params.id)

  db.getGameConfig(req.params.id)
    .then((gameConfig) => {
      createGame(gameConfig)
        .then((game) => res.send(game))
    })
})


function createGame(gameConfig){
  console.log('creating Game')
  let deferred = q.defer()

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
    deferred.resolve(game)
  })

  return deferred.promise
}

function createGameProblems(gameConfigs){
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


module.exports = router;
