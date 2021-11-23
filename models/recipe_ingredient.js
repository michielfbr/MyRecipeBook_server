"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class recipe_ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      recipe_ingredient.belongsTo(models.recipe);
      recipe_ingredient.belongsTo(models.ingredient);
    }
  }
  recipe_ingredient.init(
    {
      recipeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      ingredientId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      quantity: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      unit_singular: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      unit_plural: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "recipe_ingredient",
    }
  );
  return recipe_ingredient;
};
