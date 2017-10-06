'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const service = express();

service.set('port', (process.env.PORT || 3000));
service.set('view engine', 'pug');

servcie.use(bodyParser.json());
service.use(bodyParser.urlencoded({extended: true}));

service.get('/py/requests', function(request, response) {
	var requests = {
		'id': request.body.id,
		'name': request.body.name,
		'code': request.body.code,
		'message': request.body.message
	}
	
	response.render('pythonista', {
		'requests': requests
	});
});

service.listen(service.get('port'), function() {
	console.log('Listening To The Server');
});