const { Router } = require("express");
// const authMiddleware = require("../auth/middleware");
const { ingredient, recipe, tag } = require("../models/");
// const recipe = require("../models").recipe;
const recipe_ingredient = require("../models").recipe_ingredient;

const router = new Router();

// Get all recipes of user
router.get("/all/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId)
    const allRecipes = await recipe.findAll({
      where: {
        userId: userId,
      },
      attributes: ["id", "title", "cookingTime", "imageUrl"],
      include: [
        {
          model: ingredient,
          as: `ingredients`,
          required: false,
          attributes: ["title"],
          through: { attributes: ["quantity", "unit_singular", "unit_plural"] },
        },
        {
          model: tag,
          as: `tags`,
          required: false,
          attributes: ["title"],
          through: { attributes: [] },
        },
      ],
    });
    console.log("All recipes requested for user:", userId);
    // delete allRecipes.dataValues["createdAt"];
    res.status(200).send(allRecipes);
  } catch (e) {
    console.log(e.message);
  }
});

// Get specific recipe by :id
router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipeId = parseInt(req.params.recipeId);
    console.log(recipeId)
    const specificRecipe = await recipe.findByPk(recipeId, {
      include: [
        {
          model: ingredient,
          as: `ingredients`,
          required: false,
          attributes: ["title"],
          through: { attributes: ["quantity", "unit_singular", "unit_plural"] },
        },
        {
          model: tag,
          as: `tags`,
          required: false,
          attributes: ["title"],
          through: { attributes: [] },
        },
      ],
    });
    console.log("Recipe with id", recipeId, "requested.");
    console.log("specificRecipe:", specificRecipe);

    res.status(200).send(specificRecipe);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
