"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // recipe.hasMany(models.recipe_ingredient);
      recipe.belongsToMany(models.ingredient, {
        through: "recipe_ingredients",
        
      });

      // recipe.hasMany(models.recipe_tag);
      recipe.belongsToMany(models.tag, {
        through: "recipe_tags",
        foreignKey: "recipeId",
      });

      recipe.hasMany(models.cookedToday);
      // recipe.hasMany(models.recipecombineswithrecipe);
    }
  }
  recipe.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cookingTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      reference: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "recipe",
    }
  );
  return recipe;
};
