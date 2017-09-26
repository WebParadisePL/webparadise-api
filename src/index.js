'use strict';

var express = require("express");
var bodyParser = require("body-parser");

var service = express();

service.use(bodyParser.json());
service.use(bodyParser.urlencoded({extended: true}));

service.post("/pythonista", function(req, res) {
	res.setHeader("Content-Type", "application/json");
	
	var brightnessValue = req.body.brightnessValue;
	
	if (req.body.actionType == "ml.webparadise.api.action.ObjCAction" && req.body.function == "ml.webparadise.api.function.setBrightness") {
		res.send(JSON.stringify({
			importModule: "from objc_util import *\n",
			codeBody: "UIScreen = ObjCClass('UIScreen')\n screen = UIScreen.mainScreen()\n screen.setBrightness_(" + brightnessValue + ")\n"
		}));
	}
});

service.listen((process.env.PORT || 5000), function() {
	console.log("Listening to the server.");
});