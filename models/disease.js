"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Disease.hasMany(models.MedicalRecord);
    }
  }
  Disease.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Disease",
    }
  );
  return Disease;
};
