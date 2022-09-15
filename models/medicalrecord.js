"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MedicalRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MedicalRecord.belongsTo(models.User, {
        foreignKey: "PatientId",
        as: "Patient",
      });
      MedicalRecord.belongsTo(models.User, {
        foreignKey: "DoctorId",
        as: "Doctor",
      });
      MedicalRecord.belongsTo(models.Disease, { foreignKey: "DiseaseId" });
      MedicalRecord.hasMany(models.SymptomRecord, { as: "FullSymptoms" });
      MedicalRecord.hasMany(models.SymptomRecord, { as: "CheckSymptoms" });
    }
  }
  MedicalRecord.init(
    {
      DoctorId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      PatientId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      DiseaseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MedicalRecord",
    }
  );
  return MedicalRecord;
};
