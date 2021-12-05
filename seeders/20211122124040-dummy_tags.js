"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "tags",
      [
        {
          title: "indonesisch",
          category: "origin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "vegetarisch",
          category: "diet",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "zoet",
          category: "flavor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "hoofdgerecht",
          category: "meal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "makkelijk",
          category: "difficulty",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tags");
    
  },
};
