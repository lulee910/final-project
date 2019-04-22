const mongoCollections = require("../config/mongoCollections");
const sysUser = mongoCollections.sysUser;
const ObjectId = require("mongodb").ObjectID;
const crypto = require("crypto");

module.exports = {
    async login(userName, passWord){
        const _conlection = await sysUser();
        let md5 = crypto.createHash("md5");
        let newPas = md5.update(passWord).digest("hex");
        const user = await _conlection.findOne({userName: userName, passWord : newPas});
        return user;
    },

    async register(userName, passWord){
        const _conlection = await sysUser();
        const user = await _conlection.findOne({userName: userName});
        if(user !=null) throw "This user already exists";
        let serviceId = 1;
        let data = await _conlection.find({},{projection : {_id:0,serviceId:1}}).sort({"serviceId":-1}).limit(1).toArray();
        if(data.length > 0){
            serviceId = data[0].serviceId + 1;
        }
        let md5 = crypto.createHash("md5");
        let newPas = md5.update(passWord).digest("hex");
        let userInfo={
            userName : userName,
            passWord : newPas,
            remarks  : "administrator",
            serviceId: serviceId
        }
        
        const insertInfo = await _conlection.insertOne(userInfo);
        if(insertInfo.insertedCount == 0) throw "User creation failed";
        return true;
    }
};