"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "ingredients",
      [
        {
          title: "water",
          url: "",
          imageUrl: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "egg",
          url: "",
          imageUrl: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "oil",
          url: "",
          imageUrl: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ingredients");
  },
};
