"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SymptomRecords", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      MedicalRecordId: {
        type: Sequelize.INTEGER,
        references: { model: "MedicalRecords" },
      },
      SymptomId: {
        type: Sequelize.INTEGER,
        references: { model: "Symptoms" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("SymptomRecords");
  },
};
