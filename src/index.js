'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const service = express();

service.use(bodyParser.json());

service.post("/ios", function(req, res) {
	if (req.body.actionType == "ml.webparadise.api.action.OBJC_ACTION") {
		return res.json({
			importModule: "from objc_util import *\n"
		});
	}
	if (req.body.function == "ml.webparadise.api.function.SET_BRIGHTNESS") {
		return res.json({
			codeBody: "UIScreen = ObjCClass('UIScreen')\n screen = UIScreen.mainScreen()\n screen.setBrightness(1.0)"
		});
	}
});

service.listen((process.env.PORT || 5000), function() {
	console.log("Listening to the server.");
});
