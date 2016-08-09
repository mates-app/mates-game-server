'use strict'
var express = require('express');
var router = express.Router();
var matesEngine = require('./mates-engine-connection')
var async = require('async')
var db = require('./database')
let q = require('q')




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/call', (req, res, next) =>{

  var request = {
    "expression":"(a + b)",
    "operationConfig":{
        "probablySign": 0.2,
        "operationsPattern":"+-/*\\^"
    },
    "aritmeticVariableConfig": {
        "max":10,
        "min": 0,
        "probablySign": 0.5,
        "divisionFactor":2
    }
  }

  matesEngine.simpleProblem(request).then((result) =>{
    console.log('result', result)
    res.send(result)  
  }).catch((err)=>{
    console.log('result catch', err)
    res.send(err)
  })
})


router.post('/v1/admin/game-config', (req, res, next) => {
  console.log('request', JSON.stringify(req.body))
  db.saveGameConfig(req.body)
    .then((gameConfigSaved) => res.send(gameConfigSaved))
})

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
        gameProblems.push(gameProblem)
        
        callback()
        
      })

  }, () => {
    deferred.resolve(gameProblems)
  })

  return deferred.promise
}


module.exports = router;
