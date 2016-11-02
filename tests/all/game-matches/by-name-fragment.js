"use strict"
var request             = require('request')
var scenarios           = require('../../scenarios')
var assert              = require('chai').assert


describe("By name Fragment", function() {
    before((done) =>{
        scenarios.load('01', () => done())
    })

    describe("Call response with expected games", function() {
        it('With name=\'game\'', function(done) {

            request(`http://localhost:3000/game-match/by-name-fragment?name=game`, (err, result) =>{
                let games = JSON.parse(result.body)
                assert.equal(null, err)
                assert.equal(2, games.length,'length must be: 2')                
                assert.equal(true, games.some((game) => game.name === 'game1'))
                assert.equal(true, games.some((game) => game.name === 'game2'))
                done()
            })

        });

        it('With name=\'game1\'', function(done) {

            request(`http://localhost:3000/game-match/by-name-fragment?name=game1`, (err, result) =>{
                let games = JSON.parse(result.body)
                assert.equal(1, games.length)
                assert.equal(true, games.some((game) => game.name === 'game1'))
                done()
            })

        });

        it('Only multiplayers', function(done) {

            request(`http://localhost:3000/game-match/by-name-fragment?name=game&isMultiplayer=true`, (err, result) =>{
                let games = JSON.parse(result.body)
                assert.equal(1, games.length)
                assert.equal(true, games[0].name === 'game1')
                done()
            })

        });
        



    });

});



