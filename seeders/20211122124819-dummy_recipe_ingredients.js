"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "recipe_ingredients",
      [
        {
          recipeId: 1,
          ingredientId: 1,
          quantity: 1.5,
          unit_singular: "liter",
          unit_plural: "liters",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 1,
          ingredientId: 2,
          quantity: 1,
          unit_singular: "piece",
          unit_plural: "pieces",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 2,
          ingredientId: 3,
          quantity: 1,
          unit_singular: "splash",
          unit_plural: "splashes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 2,
          ingredientId: 2,
          quantity: 1,
          unit_singular: "piece",
          unit_plural: "pieces",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("recipe_ingredients");
  },
};
