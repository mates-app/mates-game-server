'use strict'
var express = require('express');
var router = express.Router();
var async = require('async')
let q = require('q')
let User = require('./user.dao')

router.post('/',
	User.findByUsername,
	User.create,	
	(req, res, next) => res.send(req.user)
)

router.get('/:id',
	User.findById,
	(req, res, next) => {
		console.log(req.user)
		res.send(req.user)
	}
)

router.delete('/:id',
	User.remove,
	(req, res, next) => res.send()
	
)


router.get('/is-available/:username',
	User.findByUsername,
	(req, res, next) => {
		console.log(req.user)
		res.send(req.user === null || req.user === undefined)
	}
)





module.exports = router;