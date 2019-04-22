const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + "/public");
const configRoutes = require("./router");
const exphbs = require("express-handlebars");

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.engine("handlebars", exphbs({ defaultLayout: "register",partialsDir: ["views/partials/"] }));
app.set("view engine", "handlebars");

configRoutes(app);

global.loginId = "";
global.loginName = "";
global.serviceId = "";

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});