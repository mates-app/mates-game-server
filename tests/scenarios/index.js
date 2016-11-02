'use strict'
var MongoClient = require('mongodb').MongoClient,
  co = require('co'),
  assert = require('assert');
  



let load = (scene, callback) =>{
    scene = require(`./${scene}`)
    co(function*() {
        // Connection URL
        var url = 'mongodb://localhost:27017/matesGameTest';
        // Use connect method to connect to the Server
        var db = yield MongoClient.connect(url);

        yield db.collection('gamematches').remove({})

        let r = yield db.collection('gamematches').insertMany(scene.gameMatches);       
        callback()
        // Close the connection
        db.close();
    }).catch(function(err) {
        console.log(err.stack);
    });
}

module.exports = {
    load : load
}