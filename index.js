'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const service = express();

service.set('port', (process.env.PORT || 3000));
service.set('views', path.join(__dirname, './views'));
service.set('view engine', 'pug');

service.use(bodyParser.json());
service.use(bodyParser.urlencoded({extended: true}));
service.use(express.static(path.join(__dirname, './public')));

var uri = 'mongodb://heroku_x0g4vql1:q5e49td4ic7l9vdr7bkurbo9ii@ds013495.mlab.com:13495/heroku_x0g4vql1';

mongoose.connect(uri);

service.get('/register', function(request, response) {
	response.setHeader('Content-Type', 'application/json');
	
	var userSchema = new Schema({
		username: String,
		email: String,
		password: String
	});
	
	var User = mongoose.model('Users', userSchema);
	
	var loadUser = new User({
		username: request.body.username,
		email: request.body.email,
		password: request.body.password
	});
	
	loadUser.save(function(error) {
		if (!error) {
			response.send(JSON.stringify({
				'status_code': 200,
				'status_message': 'Success!'
			}));
		} else if (error) {
			response.send(JSON.stringify({
				'status_code': 500,
				'status_message': 'Internal Server Error!'
			}));
		}
	});
});

service.listen(service.get('port'), function() {
	console.log('Listening To The Server!');
});