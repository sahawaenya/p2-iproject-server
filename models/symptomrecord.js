"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SymptomRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SymptomRecord.belongsTo(models.MedicalRecord);
      SymptomRecord.belongsTo(models.Symptom);
    }
  }
  SymptomRecord.init(
    {
      MedicalRecordId: DataTypes.INTEGER,
      SymptomId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SymptomRecord",
    }
  );
  return SymptomRecord;
};
