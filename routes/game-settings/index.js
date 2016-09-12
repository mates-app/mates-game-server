'use strict'
var express = require('express')
var router = express.Router()
let GameSettingsDao = require('./game-settings.dao')

router.post('/',
	GameSettingsDao.create,
	(req, res, next) => res.send(req.body)
)

module.exports = router;