'use strict'
var express = require('express');
var router = express.Router();
var matesEngine = require('./mates-engine-connection')
var db = require('./database')





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
    .then((gameConfig) => res.send(gameConfig))
})



module.exports = router;
