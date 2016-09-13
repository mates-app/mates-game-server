'use strict'
var express = require('express')
var router = express.Router()
let GameMatchDao = require('./game-match.dao')

router.post('/',
	GameMatchDao.create,
	(req, res, next) => res.send(req.gameSettings)
)

router.get('/:id',
	GameMatchDao.findById,
	(req, res, next) => res.send(req.gameSettings)
)

router.get('/public/:type',
	GameMatchDao.findPublics,
	(req, res, next) => res.send(req.gameSettings)
)

router.put('/score',
	GameMatchDao.pushScore,
	(req, res, next) => res.send(req.gameSettings)
)

module.exports = router;