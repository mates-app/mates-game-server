/**
 * Created by josecullen on 13/09/16.
 */
'use strict'
var express = require('express');
var router = express.Router();
let q = require('q')
let GameConfigDao = require('../game-config/game-config.dao')
let GameMatch = require('../game-match/game-match.dao')
let GameInstanceCreator = require('./game-instance.creator')


router.get('/:id/:gameMatchId*?',
    GameConfigDao.findById,
    (req, res, next) =>{
        req.params.gameMatchId === undefined ?
            GameMatch.create(req, res, next) :
            GameMatch.findById(req,res,next)
    },
    GameInstanceCreator.createGame,
    (req, res, next) => {
        console.log(req.gameMatch)
        req.game.gameMatchId = req.gameMatch._id
        res.send(req.game)
})















module.exports = router;
