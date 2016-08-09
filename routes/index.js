'use strict'
var express = require('express');
var router = express.Router();
var matesEngine = require('./mates-engine-connection')
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

router.get('/v1/admin/game-config/:id', (req, res, next) => {
  console.log('request', req.params.id)


  db.getGameConfig(req.params.id)
    .then((gameConfig) => {
      createGame(gameConfig).then((game) => res.send(game))
    })
})


function createGame(gameConfig){
  let deferred = q.defer()

  let game = {
    "name" : gameConfig.name,
    "levels": []
  }

  gameConfig.levels.forEach((level, index, array) =>{
    console.log('level', index, array.length)

    createGameProblems(level.gameProblems).then((gameProblems) =>{
      console.log('forEach createGameProblem')
      
      game.levels.push({
        "name" : level.name,
        "gameProblems" : gameProblems,
        "scoreConfig" : level.scoreConfig
      })

      if(index === array.length -1){
        console.log('resolve')
        deferred.resolve(game)
      }
    })

  })

  return deferred.promise
}

function createGameProblems(gameConfigs){
  let deferred = q.defer()

  let gameProblems = []

  gameConfigs.forEach((gameConfig, index, array) =>{
    createGameProblem(gameConfig).then((gameProblem) =>{
      gameProblems.push(gameProblem)
      if(index === array.length -1){
        console.log('resolve gameConfigs')
        deferred.resolve(gameProblems)
      }
    })
  })

  return deferred.promise
}


function createGameProblem(gameConfig){
  let deferred = q.defer()
  
  console.log('createGameProblem', gameConfig)

  if(gameConfig.type === 'simple-problem'){
    console.log('simple-problem', gameConfig)
    matesEngine.simpleProblem(gameConfig).then((gameProblem) => {
      deferred.resolve(gameProblem)
    })
  }

  return deferred.promise  
}


module.exports = router;
