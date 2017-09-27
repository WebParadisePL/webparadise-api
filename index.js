'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const service = express();

service.use(bodyParser.json());
service.use(bodyParser.urlencoded({extended: true}));
service.set('port', (process.env.PORT || 3000));

service.get('/pythonista', function(request, response) {
	response.setHeader('Content-Type', 'application/json');
	
	var brightnessValue = request.body.brightnessValue;
	
	if (request.body.actionType == 'ml.webparadise.api.action.ObjCAction' && request.body.functionType == 'ml.webparadise.api.function.setBrightness') {
		response.send(JSON.stringify({
			importModule: 'from objc_util import *\n',
			codeBody: 'UIScreen = ObjCClass("UIScreen")\n screen = UIScreen.mainScreen()\n screen.setBrightness_(' + brightnessValue + ')\n'
		}));
	}
});

service.listen(service.get('port'), function() {
	console.log('Listening to the server.');
});