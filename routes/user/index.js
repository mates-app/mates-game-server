'use strict'
var express = require('express');
var router = express.Router();
let User = require('./user.dao')

router.post('/',
	User.findByUsername,
	User.create,
	(req, res, next) => res.send(req.user)
)


router.get('/by-username-fragment',
	User.findByUsernameLike,
	(req, res, next) =>{
		res.send(req.users);
	}
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

router.get('/is-valid/:username',
	User.findByUsername,
	(req, res, next) => {
		console.log(req.user)
		let result = {
			valid: req.user !== null && req.user !== undefined,
			user : req.user 
		}
		res.send(result)
	}
)


module.exports = router;
