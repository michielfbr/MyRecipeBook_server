"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class recipe_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      recipe_tag.belongsTo(models.recipe);
      recipe_tag.belongsTo(models.tag);
    }
  }
  recipe_tag.init(
    {
      recipeId: {
        allowNull: false,
        // primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tagId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "recipe_tag",
    }
  );
  return recipe_tag;
};
