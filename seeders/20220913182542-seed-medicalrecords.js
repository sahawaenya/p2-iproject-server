"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/medrec.json").map((el) => {
      return {
        ...el,
        updatedAt: new Date(),
        createdAt: new Date(),
      };
    });
    await queryInterface.bulkInsert("MedicalRecords", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("MedicalRecords");
  },
};
