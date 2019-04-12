const register = require("./register");
const path = require("path");

const constructorMethod = app =>{
    app.use("/login_post", register);
    app.use("/", register);    
    app.use("*", (req, res) => {
      res.redirect("/");
    });
};

module.exports = constructorMethod;