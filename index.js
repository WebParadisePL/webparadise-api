'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const service = express();

service.set('port', (process.env.PORT || 3000));
service.set('view engine', 'pug');

service.use(bodyParser.json());
service.use(bodyParser.urlencoded({extended: true}));

service.get('/', function(request, response) {
	response.render('index');
});

service.listen(service.get('port'), function() {
	console.log('Listening To The Server!');
});