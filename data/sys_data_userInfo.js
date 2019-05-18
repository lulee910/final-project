const mongoCollections = require("../config/mongoCollections");
const userInfo = mongoCollections.sysUser;
const ObjectId = require("mongodb").ObjectID;
const crypto = require("crypto");


module.exports = {
    async findAll(){
        const con_userInfo = await userInfo();
        const data = await con_userInfo.find({serviceId : serviceId, remarks:{$ne : "administrator"}}).toArray();
        return data;
    },

    async findByName(name){
        const con_userInfo = await userInfo();
        const data = await con_userInfo.find({serviceId : serviceId, userName : new RegExp(name), remarks:{$ne : "administrator"}}).toArray();
        return data;
    },

    async findUser(name){
        const con_userInfo = await userInfo();
        const data = await con_userInfo.find({userName :name}).toArray();
        return data;
    },

    async findById(id){
        const con_userInfo = await userInfo();
        const data = await con_userInfo.find({_id: ObjectId(id)}).toArray();
        return data;
    },

    async add(userData){
        let userCheck = await this.findUser(userData["userName"]);
        if(userCheck.length > 0) throw "This user already exists";
        const con_userInfo = await userInfo();
        let md5 = crypto.createHash("md5");
        let newPas = md5.update(userData["passwd"]).digest("hex");
        let addInfo = {
            userName : userData["userName"],
            passWord : newPas,
            remarks  : "normal",
            serviceId: serviceId
        }
        let in_userInfo = await con_userInfo.insertOne(addInfo);
        let ret = await this.findById(in_userInfo.insertedId);
        return ret;
    },

    async update(userData){
        const con_userInfo = await userInfo();
        let md5 = crypto.createHash("md5");
        let newPas = md5.update(userData["passwd"]).digest("hex");
        let updateInfo ={$set:{
            userName : userData["userName"],
            passWord : newPas,
        }};
        await con_userInfo.updateOne({_id: ObjectId(userData._id), serviceId: serviceId}, updateInfo);
        let ret = await this.findById(userData._id);
        return ret;
    },

    async delete(id){
        const con_userInfo = await userInfo();
        let ret = await con_userInfo.removeOne({_id : ObjectId(id), serviceId:serviceId});
        return ret.deletedCount;
    }

}