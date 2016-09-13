'use strict'
var express = require('express');
var router = express.Router();
var matesEngine = require('./mates-engine-connection')
var async = require('async')
var db = require('./database')
let q = require('q')

router.all('/', function(req, res, next) {
  next();
 });


module.exports = router;
