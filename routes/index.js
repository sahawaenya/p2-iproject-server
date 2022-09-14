const routes = require("express").Router();
const routesPatient = require("./medicalData");

// routes.get("/", (req, res) => {
//   res.status(200).json("masuk");
// });
routes.use("/", routesPatient);

module.exports = routes;
