const register = require("./register");
const drugCharge = require("./c_drugCharge");
const chargeSummary = require("./c_chargeSummary");
const doctorInfo = require("./sys_doctorInfo");
const drugInfo = require("./d_drugInfo");
const dailyBusiness = require("./f_dailyBusiness");
const performanceSummary = require("./f_performanceSummary");
const changePasswd = require("./sys_changePasswd");
const userInfo = require("./sys_userInfo");
const path = require("path");


const constructorMethod = app =>{
    app.use("/login", register);
    app.use("/register", register);
    app.use("/drugCharge", drugCharge);
    app.use("/drugInfo", drugInfo);
    app.use("/dailyBusiness", dailyBusiness);
    app.use("/performanceSummary", performanceSummary);
    app.use("/chargeSummary", chargeSummary);
    app.use("/doctorInfo", doctorInfo);
    app.use("/changePasswd", changePasswd);
    app.use("/userInfo", userInfo);
    app.use("/", register);   
     
    app.use("*", (req, res) => {
      res.redirect("/");
    });
};

module.exports = constructorMethod;