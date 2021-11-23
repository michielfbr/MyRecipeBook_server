"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "tags",
      [
        {
          title: "Quick",
          category: "time",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Easy",
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
