const MongoClient = require("mongodb").MongoClient;
const crypto = require("crypto");
const url = "mongodb://localhost:27017/project";

MongoClient.connect(url,{ useNewUrlParser: true }, function (err, client) {
    if (err) {
        console.log("database connection failed");
        return;
    }
    console.log("database connection success");

    var db = client.db("project");
    let md5 = crypto.createHash("md5");
    let newPas = md5.update("123456").digest("hex");
    db.dropDatabase()
        .then(() => {
            db.collection("sysUser").insertOne({
                userName: "Phil",
                passWord: newPas,
                remarks: "administrator",
                serviceId: 1
            })
                .then(() => {
                    db.collection("drugInfo").insertMany([
                        { drugName: "aaa", barCode: "", drugType: "1", drugSpec: "", drugUnit: "1", drugPrice: "11.11", SCDate: "05/17/2019", remark: "", serviceId: 1 },
                        { drugName: "bbb", barCode: "", drugType: "1", drugSpec: "", drugUnit: "2", drugPrice: "22.22", SCDate: "05/17/2019", remark: "", serviceId: 1 },
                        { drugName: "ccc", barCode: "", drugType: "2", drugSpec: "", drugUnit: "3", drugPrice: "33.33", SCDate: "05/17/2019", remark: "", serviceId: 1 },
                        { drugName: "ddd", barCode: "", drugType: "2", drugSpec: "", drugUnit: "1", drugPrice: "44.44", SCDate: "05/17/2019", remark: "", serviceId: 1 }
                    ]).then(() => {
                        db.collection("doctorInfo").insertMany([
                            { firstName: "Eric", lastName: "Wang", tel: "111-111-1111", serviceId: 1 },
                            { firstName: "Steven", lastName: "Liu", tel: "222-222-2222", serviceId: 1 },
                            { firstName: "Jack", lastName: "Chen", tel: "333-333-3333", serviceId: 1 }
                        ])
                    }).then(() => {
                        console.log("Done seeding database");
                        client.close();
                    })
                })
        })
});
