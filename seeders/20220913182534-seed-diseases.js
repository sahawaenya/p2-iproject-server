"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/diseases.json").map((el) => {
      return {
        ...el,
        updatedAt: new Date(),
        createdAt: new Date(),
      };
    });
    await queryInterface.bulkInsert("Diseases", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Diseases");
  },
};
