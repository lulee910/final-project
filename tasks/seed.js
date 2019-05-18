const dbConnection = require("../config/mongoConnection");
const doctors = require("../data/c_data_doctorInfo");
const drugs = require("../data/d_data_drugInfo");
const registers = require("../data/register");


dbConnection().then(
    db => {
        return db
            .dropDatabase()
            .then(() => {
                return dbConnection;
            })
            .then(db => {
                return registers.register("Phil", "123456");
            })
            .then(db => {
                return drugs
                    .add({ drugName: "aaa",barCode:"",drugType: "1", drugSpec:"",  drugUnit:"1", drugPrice: "11.11",SCDate : "05/17/2019", remark : "" })
                    .then(() => {
                        return drugs.add({ drugName: "bbb",barCode:"",drugType: "1", drugSpec:"",  drugUnit:"2", drugPrice: "22.22",SCDate : "05/17/2019", remark : "" });
                    })
                    .then(() => {
                        return drugs.add({ drugName: "ccc",barCode:"",drugType: "2", drugSpec:"",  drugUnit:"3", drugPrice: "33.33",SCDate : "05/17/2019", remark : "" });
                    })
                    .then(() => {
                        return drugs.add({ drugName: "ddd",barCode:"",drugType: "2", drugSpec:"",  drugUnit:"1", drugPrice: "44.44",SCDate : "05/17/2019", remark : "" });
                    });
            })
            .then(db => {
                return doctors
                    .add({ firstName: "Eric", lastName: "Wang", tel: 111-111-1111 })
                    .then(() => {
                        return doctors.add({ firstName: "Steven", lastName: "Liu", tel: 222-222-2222 });
                    })
                    .then(() => {
                        return doctors.add({ firstName: "Jack", lastName: "Chen", tel: 333-333-3333 });
                    });
            })
            .then(() => {
                console.log("Done seeding database");
                db.close();
            })
            .catch(err => {
                console.error(err);
            });
    },
    error => {
        console.error(error);
    }
);
