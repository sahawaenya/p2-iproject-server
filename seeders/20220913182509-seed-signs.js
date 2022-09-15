"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/signs.json").map((el) => {
      return {
        ...el,
        updatedAt: new Date(),
        createdAt: new Date(),
      };
    });
    await queryInterface.bulkInsert("Signs", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Signs");
  },
};
