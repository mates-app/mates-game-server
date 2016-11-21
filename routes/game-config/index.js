/**
 * Created by josecullen on 12/09/16.
 */

'use strict'

module.exports = (io) =>{

    let express = require('express');
    let router = express.Router();
    let GameConfigDao = require('./game-config.dao')

    router.post('/',
        GameConfigDao.create,
        (req, res, next) => res.send(req.gameConfig)
    )
    
    router.get('/name-matching/:name',
        GameConfigDao.findByNameMatching,
        (req, res, next) => res.send(req.gameConfigs)
    )

    router.get('/:id',
        GameConfigDao.findById,
        (req, res, next) => res.send(req.gameConfig)
    )

    router.get('/public/all',
        GameConfigDao.findPublics,
        (req, res, next) => {
            
            io.emit('news', {
                'hola' : 'hola'
            })
            res.send(req.gameConfigs)
        }
    )

    return router

}