"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "recipes",
      [
        {
          title: "Boiled egg",
          instructions:
            "1. Put water in pan and boil. 2. When water boils, add the eggs. 3. Let them boil for 5-8 minutes. 4. Remove the eggs from boiling water.",
          cookingTime: "00:10",
          imageUrl:
            "https://food.unl.edu/newsletters/images/hard-cooked-eggs_0.jpg",
          reference: "Mom",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Fried egg",
          instructions:
            "1. Heat the oil in a baking pan. 2. When the oil is hot, break the eggs and put in pan. 3. Let it cook until the egg solidifies. 4. Serve the eggs.",
          cookingTime: "00:15",
          imageUrl:
            "https://dejuistekooktijd.nl/wp-content/uploads/2021/09/ei-bakken.jpg",
          reference: "Mom",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Boiled egg user 2",
          instructions:
            "1. Put water in pan and boil. 2. When water boils, add the eggs. 3. Let them boil for 5-8 minutes. 4. Remove the eggs from boiling water.",
          cookingTime: "00:10",
          imageUrl:
            "https://food.unl.edu/newsletters/images/hard-cooked-eggs_0.jpg",
          reference: "Mom",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Fried egg user 2",
          instructions:
            "1. Heat the oil in a baking pan. 2. When the oil is hot, break the eggs and put in pan. 3. Let it cook until the egg solidifies. 4. Serve the eggs.",
          cookingTime: "00:15",
          imageUrl:
            "https://dejuistekooktijd.nl/wp-content/uploads/2021/09/ei-bakken.jpg",
          reference: "Mom",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("recipes");
  },
};
