'use strict'

var request = require('request')
var q = require('q')
let matesLib = require('../lib/models/models')


let createProblem = function(req){
	var deferred = q.defer()
	try{
		let builder = new matesLib.SimpleProblemBuilder(
			req.constants, 
			new matesLib.NumberConfig(
				req.numberConfig.min, 
				req.numberConfig.max, 
				req.numberConfig.probablySign, 
				req.numberConfig.divisors), 
			new matesLib.OperationConfig(req.operationConfig.operations))
		let gameProblems = []

		for(let i = 0; i < req.repetitions; i++){
			gameProblems.push(builder.build())
		}

		deferred.resolve(gameProblems)
	
	}catch(err){
		console.error(err)
		throw(new Error(err))
	}
		
	return deferred.promise	
}

function getUrlByType(type){
	switch(type){
		case 'simple-problem':
			return 'http://localhost:9090/v1/aritmetic/simple-problem'
		case 'equation-problem':
			return 'http://localhost:9090/v1/aritmetic/equation-problem'
		case 'simple-module-problem':
			return 'http://localhost:9090/v1/aritmetic/simple-module-problem'
		case 'system-problem':
			return 'http://localhost:9090/v1/aritmetic/system-problem'
		case 'logic-problem':
			return 'http://localhost:9090/v1/logic/logic-problem'
	}
	
}


module.exports = {
	createProblem : createProblem
}