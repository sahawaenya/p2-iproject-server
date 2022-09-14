"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = require("../data/users.json").map((el) => {
      return {
        ...el,
        password: bcrypt.hashSync(`${el.password}`, 10),
        updatedAt: new Date(),
        createdAt: new Date(),
      };
    });
    await queryInterface.bulkInsert("Users", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users");
  },
};
