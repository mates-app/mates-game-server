'use strict'

module.exports = (io) => {

	var express = require('express')
	var router = express.Router()
	let GameMatchDao = require('./game-match.dao')

	router.get('/socket', (req, res, next) => {
		console.log('/socket')		
		io.on('connection', function(socket){
			console.log('socket connected', '/socket/')
			socket.on('news', (msg) => {
				console.log(msg)
			})	
			socket.on('other', (msg) => {
				console.log(msg)
			})
		})	

		io.emit('news', 'news hola')
		io.emit('connect', 'hola')
		res.send('ok')
	})

	router.post('/',
		GameMatchDao.create,
		(req, res, next) => res.send(req.gameMatch)
	)

	router.get('/by-name-fragment', 
		GameMatchDao.findByNameFragment,
		(req, res, next) => res.send(req.gameMatches)
	)

	router.get('/exists/:name',
		GameMatchDao.findByName,
		(req, res, next) => {
			console.log(req.gameMatch)
			res.send(req.gameMatch !== undefined && req.gameMatch !== null)
		})

	router.get('/:id',
		GameMatchDao.findById,
		(req, res, next) => res.send(req.gameMatch)
	)

	router.get('/public/:type',
		GameMatchDao.findPublics,
		(req, res, next) => res.send(req.gameMatches)
	)

	router.put('/score',
		GameMatchDao.pushScore,
		(req, res, next) => res.send('ok')
	)

	router.put('/join', (req, res, next) => {
		io.emit(req.body.gameMatchId, {
			'type'   : 'join',
			'joined' : req.body.user 
		})		
		res.send('ok')
	})

	router.put('/start',
		GameMatchDao.start,
		(req, res, next) => {
			io.emit(req.body.gameMatchId, { 'type' : 'start' })
			res.send(req.gameMatch)
		}
	)

	
	return router;
}
