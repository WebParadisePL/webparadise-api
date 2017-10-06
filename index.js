'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const service = express();

service.use(bodyParser.json());
service.use(bodyParser.urlencoded({extended: true}));

service.set('port', (process.env.PORT || 3000));
service.set('view engine', 'pug');

function getMySQLConnection() {
	return mysql.createConnection({
		host: 'sql12.freesqldatabase.com',
		user: 'sql12197988',
		password: 'pMCjlAs8ZS',
		database: 'sql12197988'
	});
}

service.get('/data/developers', function(request, response) {
	var developersList = [];
	
	var connection = getMySQLConnection();
	connection.connect();
	
	connection.query('SELECT * FROM nodejs', function(error, rows, fields) {
		if (error) {
			response.status(500).json({
				'status_code': 500,
				'status_message': 'Internal Server Error'
			});
		} else {
			for (var i = 0; i < rows.length; i++) {
				var developer = {
					'name': rows[i].name,
					'post': rows[i].post,
					'img': rows[i].img,
					'id': rows[i].id
				}
				developersList.push(developer);
			}
			response.render('developers', {
				'developersList': developersList
			});
		}
	});
	connection.end();
});

service.get('/data/developers/:id', function(request, response) {
	var connection = getMySQLConnection();
	connection.connect();
	
	connection.query('SELECT * FROM nodejs WHERE id = ' + request.params.id, function(error, rows, fields) {
		var developer;
		
		if (error) {
			response.status(500).json({
				'status_code': 500,
				'status_message': 'Internal Server Error'
			});
		} else {
			if (rows.length == 1) {
				var developer = {
					'name': rows[0].name,
					'post': rows[0].post,
					'img': rows[0].img,
					'id': rows[0].id
				}
				response.render('developers_detail', {
					'developer': developer
				});
			} else {
				response.status(404).json({
					'status_code': 404,
					'status_message': 'Not Found'
				});
			}
		}
	});
	connection.end();
});

service.listen(service.get('port'), function() {
	console.log('Listening to the server.');
});