'use strict'
let mongoose = require('mongoose')
let GameMatch = require('./game-match.model')


module.exports.create = (req, res, next) =>{
    let gameId = req.body.gameId
    
    if (gameId.name === undefined && !mongoose.Types.ObjectId.isValid(gameId)) {
        console.log('gameId invalid')
        return next(new Error('You must supply a GameConfig ID'))
    }

    let gameMatch = new GameMatch(req.body)

    console.log(gameMatch)

    if(gameMatch._id){
        GameMatch.findOneAndUpdate(
            {_id: gameMatch._id},
            gameMatch,
            { upsert:true},
            (err, gameMatch) => {
                console.log('err', err)
                if (err) return next(err)
                req.gameMatch = gameMatch
                next()
            })
    } else {
        gameMatch.save((err) => {
            console.log('err', err)
            if (err) return next(err)
            req.gameMatch = gameMatch
            next()
        })
    }

    
}

module.exports.findById = (req, res, next) => {
    let gameMatchId = req.params.gameMatchId || req.params.id
    console.info('gameMatchId',gameMatchId)

    GameMatch
        .findById(gameMatchId)
        .populate('users')
        .populate('author')  
        .populate('gameId')    
        .exec((err, gameMatch) =>{
            if(err) return next(err)
            req.gameMatch = gameMatch
            next()
        })
}

module.exports.findByNameFragment = (req, res, next) => {
    let nameFragment = req.params.name || req.query.name
    let re = new RegExp(nameFragment, 'i');
    console.log('findByNameFragment')
    GameMatch.find({name : re})
             .populate('users')
             .populate('author')
             .exec((err, gameMatches) =>{
                if(err) return next(err)
                req.gameMatches = gameMatches
                console.log(gameMatches)
                next()
             })
}

module.exports.findByNameMatching = (req, res, next) => {
    let nameFragment = req.params.name || req.query.name
    let re = new RegExp(nameFragment, 'i');

    console.log(req.query)
    req.query.name = re;

    GameMatch.find(req.query)
             .populate('users')
             .populate('author')
             .exec((err, gameMatches) =>{
                if(err) return next(err)
                req.gameMatches = gameMatches
                console.log(gameMatches)
                next()
             })
}

module.exports.findByName = (req, res, next) => {
    let name = req.params.name || req.query.name

    GameMatch.findOne({name : name}, (err, gameMatch) =>{        
        if(err) return next(err)
        req.gameMatch = gameMatch
        next()
    })
}

module.exports.findPublics = (req, res, next) => {
    let query = {
        isMultiPlayer: req.params.type === 'multi-player'
    }
    GameMatch.find(query, (err, gameMatches) =>{
        console.info(query)

        if(err){
            return next(err)
        }

        req.gameMatches = gameMatches

        next()

    })
}


module.exports.start = (req, res, next) => {
    let gameMatchId = req.body.gameMatchId

    if (!mongoose.Types.ObjectId.isValid(gameMatchId)) {
        console.log('error gameId')
        return next(new Error('You must supply a GameMatch ID'))
    }

    GameMatch.update(
        {_id : gameMatchId}, 
        { $set : { 'isStarted' : true}},
        (err, gameMatch) =>{
            if(err) return next(err)

            req.gameMatch = gameMatch
            next()
        })
}


module.exports.pushScore = (req, res, next) => {
    let gameMatchId = req.body.gameMatchId
    let userId = req.body.userId
    let scoreToAdd = req.body.scoreToAdd
    console.log('pushScore', gameMatchId, userId, scoreToAdd)

    if (!mongoose.Types.ObjectId.isValid(gameMatchId)) {
        console.log('error gameId')
        return next(new Error('You must supply a GameMatch ID'))
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        console.log('error userId')
        return next(new Error('You must supply a User ID'))
    }

    let query = {
        _id : gameMatchId
    }

    GameMatch.findOne(gameMatchId, (err, gameScore) =>{

        if(err) {
            console.log('error finding')
            return next(err)
        }

        if(gameScore !== undefined && gameScore !== null){
            let score = gameScore.scores.find((score) => score.user.equals(userId))
            if(score){
                score.score += scoreToAdd
            }else{
                gameScore.scores.push({
                    user : userId,
                    score : scoreToAdd
                })
            }

            gameScore.save((err) =>{
                if(err) {
                    console.log('error saving')
                    return next(err)
                }
                next()
            })
        }else{
            next()
        }
    })

}













