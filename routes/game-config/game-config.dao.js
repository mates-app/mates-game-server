/**
 * Created by josecullen on 12/09/16.
 */
'use strict'
let mongoose = require('mongoose');
let GameConfig = require('./game-config.model')



module.exports.create = (req, res, next) =>{
    let gameConfig = new GameConfig(req.body)

    gameConfig.save((err) => {
        if (err) return next(err)

        req.gameConfig = gameConfig

        next()
    })
}

module.exports.findById = (req, res, next) =>{
    GameConfig.findById(req.params.id, (err, gameConfig) =>{
        console.info(req.params.id)

        if(err){
            return next(err)
        }

        req.gameConfig = gameConfig

        next()

    })
}


module.exports.findPublics = (req, res, next) => {
    GameConfig.find({ isPublic : true }, (err, gameConfigs) =>{
        if(err){
            return next(err)
        }
        req.gameConfigs = gameConfigs
        next()
    })
}

let findByNameMatching = (req, res, next) =>{
    let nameFragment = req.params.name || req.query.name
    let re = new RegExp(nameFragment, 'i');

    GameConfig.find({name : re}, (err, gameConfigs) =>{
        
        if(err) 
            return next(err)
        req.gameConfigs = gameConfigs
        next()

    })
}
    
module.exports.findByNameMatching = findByNameMatching