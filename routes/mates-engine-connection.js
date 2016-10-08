'use strict'

var request = require('request')
var q = require('q')


let createProblem = function(req){
	var deferred = q.defer()
	console.log(req.type)
	request.post( { 
	    uri: getUrlByType(req.type),
	    json: true,
	    headers: {
	     'Content-Type' : 'application/json',
	    },
	    body: req
	},	

	function (error, res2, object) {
	    if (error) { 
	     	deferred.resolve(res2.body)
	    }
	    else if (res2.statusCode != 200 ) {
		    deferred.resolve(res2.body)
	    }else{
	      	deferred.resolve(res2.body)
	    }	    
	})

		
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