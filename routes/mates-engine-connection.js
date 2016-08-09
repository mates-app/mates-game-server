var request = require('request')
var q = require('q')

var simpleProblem = 
	function(req){
		var deferred = q.defer()
		console.log('simple-problem', req)
		request.post( { 
		    uri: 'http://localhost:9090/v1/aritmetic/simple-problem',
		    json: true,
		    headers: {
		     'Content-Type' : 'application/json',
		    },
		    body: req
		},	
		function (error, res2, object) {
		    console.log('resolve', res2.statusCode, res2.body)
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


module.exports = {
	simpleProblem : simpleProblem
}