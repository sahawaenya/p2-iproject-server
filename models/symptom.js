"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Symptom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Symptom.belongsTo(models.Body, { foreignKey: "BodyId" });
      Symptom.belongsTo(models.Sign, { foreignKey: "SignId" });
      Symptom.hasMany(models.SymptomRecord);
    }
  }
  Symptom.init(
    {
      BodyId: DataTypes.INTEGER,
      SignId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Symptom",
    }
  );
  return Symptom;
};
