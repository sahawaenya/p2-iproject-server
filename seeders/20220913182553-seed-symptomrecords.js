"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/symptomrecs.json").map((el) => {
      return {
        ...el,
        updatedAt: new Date(),
        createdAt: new Date(),
      };
    });
    await queryInterface.bulkInsert("SymptomRecords", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("SymptomRecords");
  },
};
