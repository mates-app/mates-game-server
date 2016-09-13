'use strict'
var express = require('express')
var router = express.Router()
let GameSettingsDao = require('./game-settings.dao')

router.post('/',
	GameSettingsDao.create,
	(req, res, next) => res.send(req.gameSettings)
)

router.get('/:id',
	GameSettingsDao.findById,
	(req, res, next) => res.send(req.gameSettings)
)

router.get('/public/:type',
	GameSettingsDao.findPublics,
	(req, res, next) => res.send(req.gameSettings)
)

router.put('/score',
	GameSettingsDao.pushScore,
	(req, res, next) => res.send(req.gameSettings)
)

module.exports = router;