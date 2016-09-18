'use strict'
// var express = require('express')
// let app = express()
// var router = express.Router()
// var matesEngine = require('./mates-engine-connection')
// var async = require('async')

// let q = require('q')
// var server = require('http').Server(app);
// let io = require('socket.io').listen(server);



// router.all('/', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
// });

// module.exports = router;


module.exports = function(io){

  let express = require('express')
  let router = express.Router()
  router.io = io
  router.get('/',  (req, res, next) => {

    io.on('connection', function(socket){

      socket.on('news', (msg) => {
        console.log(msg)
      })
      
      socket.on('other', (msg) => {
        console.log(msg)
      })
      
      io.emit('news', {'new': 'new'})
      io.emit('connect', 'connected')
      console.log('a user connected');

    });

    // res.send('home page. . .')
    res.render('index', { title: 'Express' });
  })

  


  return router

}