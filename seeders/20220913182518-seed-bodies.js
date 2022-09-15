"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/bodies.json").map((el) => {
      return {
        ...el,
        updatedAt: new Date(),
        createdAt: new Date(),
      };
    });
    await queryInterface.bulkInsert("Bodies", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Bodies");
  },
};
