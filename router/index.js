const register = require("./register");
const drugCharge = require("./c_drugCharge");
const path = require("path");

const constructorMethod = app =>{
    app.use("/login", register);
    app.use("/register", register);
    app.use("/drugCharge", drugCharge);
    app.use("/", register);    
    app.use("*", (req, res) => {
      res.redirect("/");
    });
};

module.exports = constructorMethod;