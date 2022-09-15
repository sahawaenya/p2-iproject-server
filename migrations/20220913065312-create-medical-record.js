"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MedicalRecords", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      DoctorId: {
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      PatientId: {
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      DiseaseId: {
        type: Sequelize.INTEGER,
        references: { model: "Diseases" },
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
    await queryInterface.dropTable("MedicalRecords");
  },
};
