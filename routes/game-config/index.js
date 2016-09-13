/**
 * Created by josecullen on 12/09/16.
 */

'use strict'
var express = require('express');
var router = express.Router();
let GameConfigDao = require('./game-config.dao')


router.post('/',
    GameConfigDao.create,
    (req, res, next) => res.send(req.gameConfig)
)

router.get('/:id',
    GameConfigDao.findById,
    (req, res, next) => res.send(req.gameConfig)
)

router.get('/public/all',
    GameConfigDao.findPublics,
    (req, res, next) => res.send(req.gameConfigs)
)




module.exports = router;