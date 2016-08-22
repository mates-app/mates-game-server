'use strict'
var mongoose = require('mongoose')
var User = require('./user.model')

module.exports.findById = (req, res, next) => {
	var userId = req.params.id || req.body.userId
	
	if (!mongoose.Types.ObjectId.isValid(userId)) {
	  return next(new Error('You must supply a User ID'))
	}

	var query = User.findById(userId, (err, user) =>{
		if(err != null)
			return next(new Error('You must supply a User ID'))
		else{
			req.user = user
			return next()
		} 			
	})

}

let findByUsername = (req, res, next) =>{
	let username = req.params.username || req.body.username
	console.log(username)
	User.findOne({'username': username}, (err, user) =>{
		if(err) return err
		else req.user = user
		
		next()
	}) 
}

module.exports.create = (req, res, next) =>{

	if(req.user){
		return next(new Error('User already exists'))
	}else{
		let user = new User({
			username : req.body.username
		})

		user.save((err) => {
		    if (err) return next(err)

		    // log('Created User with id ' + user._id)

		    req.user = user

		    next()
	  	})	
	}
}

module.exports.findById = (req, res, next) => {
	let id = req.params.id || req.body.id
	console.log('id',id)

	if (!mongoose.Types.ObjectId.isValid(id)) {
    	return next(new Error('You must supply a User ID'))
  	}

	User.findById(id, (err, user) =>{
		if(err) return err
		else req.user = user
		
		next()
	})
}


module.exports.findByUsername = findByUsername