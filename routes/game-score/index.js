'use strict'
var express = require('express')
var router = express.Router()
let GameScore = require('./game-score.dao')

router.post('/',
	GameScore.create,	
	(req, res, next) => res.send(req.user)
)

router.get('/:gameId',
	GameScore.findByGameId,
	(req, res, next) => {
		console.log(req.gameScore)
		res.send(req.gameScore)
	}
)

router.put('/push-score',
	GameScore.pushScore,
	(req, res, next) => res.send(req.gameScore)
)

router.delete('/:gameId',
	GameScore.remove,
	(req, res, next) => res.send()
)

module.exports = router;