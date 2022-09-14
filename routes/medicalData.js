const Controller = require("../controllers/controller");

const routes = require("express").Router();

routes.get("/medicalrecord", Controller.getMedicalRecord);
routes.get("/symptomrecords", Controller.getSymptRecord);

module.exports = routes;
