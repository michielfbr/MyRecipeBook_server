"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cookedToday extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      cookedToday.belongsTo(models.user);
      cookedToday.belongsTo(models.recipe);
    }
  }
  cookedToday.init(
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      recipeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "cookedToday",
    }
  );
  return cookedToday;
};
