const dbConnection = require("../config/mongoConnection");
const doctors = require("../data/c_data_doctorInfo");
const charges = require("../data/c_data_drugCharge");
const drugs = require("../data/d_data_drugInfo");
const registers = require("../data/register");
const users = require("../data/sys_data_userInfo");


dbConnection().then(
    db => {
        return db
            .dropDatabase()
            .then(() => {
                return dbConnection;
            })
            .then(() => {
                return registers
                .register("Phil1", "111")
                .then(user => {
                    console.log(user);
                    return registers.register("Phil2", "222");
                })
            })
            .then(user => {
                console.log(user);
                const serviceId = user[0].serviceId;
                return drugs
                    .add({ drugName: "aaa",barCode:"",drugType: "1", drugSpec:"",  drugUnit:"1", drugPrice: "11.11",SCDate : "05/17/2019", remark : "", serviceId : serviceId })
                    .then(() => {
                        return drugs.add({ drugName: "bbb",barCode:"",drugType: "1", drugSpec:"",  drugUnit:"2", drugPrice: "22.22",SCDate : "05/17/2019", remark : "", serviceId : serviceId });
                    })
                    .then(() => {
                        return drugs.add({ drugName: "ccc",barCode:"",drugType: "2", drugSpec:"",  drugUnit:"3", drugPrice: "33.33",SCDate : "05/17/2019", remark : "", serviceId : serviceId });
                    })
                    .then(() => {
                        return drugs.add({ drugName: "ddd",barCode:"",drugType: "2", drugSpec:"",  drugUnit:"1", drugPrice: "44.44",SCDate : "05/17/2019", remark : "", serviceId : serviceId });
                    });
            })
            .then(drug => {
                console.log(drug);
                const serviceId = drug[0].serviceId;
                return doctors
                    .add({ firstName: "Eric", lastName: "Wang", tel: "111-111-1111", serviceId : serviceId })
                    .then(() => {
                        return doctors.add({ firstName: "Steven", lastName: "Liu", tel: "222-222-2222", serviceId : serviceId });
                    })
                    .then(() => {
                        return doctors.add({ firstName: "Jack", lastName: "Chen", tel: "333-333-3333", serviceId : serviceId });
                    });
            })
            .then(() => {
                console.log("Done seeding database");
            })
            .catch(err => {
                console.error(err);
            });
    },
    error => {
        console.error(error);
    }
);
