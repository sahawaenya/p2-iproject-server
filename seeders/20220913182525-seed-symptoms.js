"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/symptoms.json").map((el) => {
      return {
        ...el,
        updatedAt: new Date(),
        createdAt: new Date(),
      };
    });
    await queryInterface.bulkInsert("Symptoms", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Symptoms");
  },
};
