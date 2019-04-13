const mongoCollections = require("../config/mongoCollections");
const sysUser = mongoCollections.sysUser;
const ObjectId = require("mongodb").ObjectID;

module.exports = {
    async login(userName, passWord){
        //const _conlection = await sysUser();
        //const user = await _conlection.findOne({userName: userName, passWord : passWord});
        //if(user == null){
           // return false;
        //}else{
            return true;
        //}
    },

    async register(userName, passWord){
        let userInfo={
            userName : userName,
            passWord : passWord,
            remarks  : "administrator"
        }
        const _conlection = await sysUser();
        const insertInfo = await _conlection.insertOne(userInfo);
        if(insertInfo.insertedCount == 0) throw "User creation failed";
        return true;
    }
};