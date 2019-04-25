const register = require("./register");
const drugCharge = require("./c_drugCharge");
const chargeSummary = require("./c_chargeSummary");
const doctorInfo = require("./sys_doctorInfo");
const changePasswd = require("./sys_changePasswd");
const path = require("path");

const constructorMethod = app =>{
    app.use("/login", register);
    app.use("/register", register);
    app.use("/drugCharge", drugCharge);
    app.use("/drugInfo", drugCharge);
    app.use("/chargeSummary", chargeSummary);
    app.use("/doctorInfo", doctorInfo);
    app.use("/changePasswd", changePasswd);
    app.use("/", register);    
    app.use("*", (req, res) => {
      res.redirect("/");
    });
};

module.exports = constructorMethod;