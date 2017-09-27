'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const service = express();

service.use(bodyParser.json());
service.use(bodyParser.urlencoded({extended: true}));

service.set('port', (process.env.PORT || 3000));

service.post('/pythonista', function(request, response) {
	response.setHeader('Content-Type', 'application/json');
	
	var brightnessValue = request.body.brightnessValue;
	
	setTimeout(function() {
		if (request.body.actionType == 'ml.webparadise.api.action.ObjCAction' && request.body.functionType == 'ml.webparadise.api.function.setBrightness') {
			response.send(JSON.stringify({
				importModule: 'from objc_util import *\n',
				codeBody: 'UIScreen = ObjCClass("UIScreen")\nscreen = UIScreen.mainScreen()\nscreen.setBrightness_(' + brightnessValue + ')\n'
			}));
		}
	}, 1000)
});

service.post('/oauth/python/v1.1/authorize', function(request, response) {
	response.setHeader('Content-Type', 'application/json');
	
	if (request.body.username == "user_admin" && request.body.password == "passkey123") {
		response.send(JSON.stringify({
			authCallbackCode: 200,
			giveAccess = true,
			message: "You are welcome to Simple Auth."
		}));
	} else if (request.body.username !== "user_admin" && request.body.password == "passkey123") {
		response.send(JSON.stringify({
			authCallbackCode: 201,
			giveAccess = false,
			message: "Your username is incorrect."
		}));
	} else if (request.body.username == "user_admin" && request.body.password !== "passkey123") {
		response.send(JSON.stringify({
			authCallbackCode: 202,
			giveAccess = false,
			message: "Your password is incorrect."
		}));
	} else {
		response.send(JSON.stringify({
			authCallbackCode: 203,
			giveAccess = false,
			message: "Your username & password are incorrect."
		}));
	}
});

service.listen(service.get('port'), function() {
	console.log('Listening to the server.');
});