"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "recipe_tags",
      [
        {
          recipeId: 1,
          tagId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 1,
          tagId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 2,
          tagId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 2,
          tagId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 3,
          tagId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 3,
          tagId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 4,
          tagId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("recipe_tags");
  },
};
