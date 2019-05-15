const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + "/public");
const configRoutes = require("./router");
const exphbs = require("express-handlebars");
const session = require('express-session');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))

app.use(async function(req, res, next) {
	if (req.session && req.session.name == 'AuthCookie') {
		console.log(
			'[' + new Date().toUTCString() + '] ' + req.method + ' ' + req.originalUrl + ' ' + '(Authenticated User)'
		);
	} else {
		console.log(
			'[' + new Date().toUTCString() + '] ' + req.method + ' ' + req.originalUrl + ' ' + '(Non-Authenticated User)'
		);
	}
	next();
});

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.engine("handlebars", exphbs({ defaultLayout: "register",partialsDir: ["views/partials/"] }));
app.set("view engine", "handlebars");

configRoutes(app);

global.loginId = "";
global.loginName = "";
global.serviceId = "";
global.remarks = "";

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});