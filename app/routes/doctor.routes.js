const express  = require('express');
const doctors = require("../controllers/doctor.controller");
const userInfo = require("../controllers/regUserInfo.controller");

module.exports = (app) => {
    const router = express.Router();

    router.route("/")
        .get(doctors.findAll)
        .post(doctors.create)
        .delete(doctors.deleteAll);
    
    router.route("/register/")
        .get(userInfo.findAll)
        .post(userInfo.create)

    router.route("/:id")
        .get(doctors.findOne)
        .put(doctors.update)
        .delete(doctors.delete);
        
    

    app.use("/api/doctors", router);
}