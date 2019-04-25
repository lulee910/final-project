const mongoCollections = require("../config/mongoCollections");
const sysUser = mongoCollections.sysUser;
const crypto = require("crypto");

module.exports = {
    async changePasswd(newPasswd){
        const _conlection = await sysUser();
        let md5 = crypto.createHash("md5");
        let newPas = md5.update(newPasswd).digest("hex");
        const user = await _conlection.updateOne({userName: loginName},{$set: {"passWord" : newPas}});
        return user;
    }
}