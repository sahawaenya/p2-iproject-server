const Controller = require("../controllers/controller");

const routes = require("express").Router();

routes.get("/medicalrecord", Controller.getMedicalRecord);
routes.get("/symptomrecords", Controller.getSymptRecord);
routes.post("/symptomcheck", Controller.getSymptRecordRank);
routes.post("/symptoms", Controller.getSymptoms);
routes.post("/disease", Controller.getDisease);
routes.get("/registereddiseases", Controller.registeredDiseases);
routes.post("/gsearch", Controller.googleSearch);
routes.get("/numberdata", Controller.countData);

module.exports = routes;
