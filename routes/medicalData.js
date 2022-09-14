const Controller = require("../controllers/controller");

const routes = require("express").Router();

routes.get("/medicalrecord", Controller.getMedicalRecord);

module.exports = routes;
