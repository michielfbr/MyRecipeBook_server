const { Router } = require("express");
// const authMiddleware = require("../auth/middleware");
const { ingredient, recipe, tag } = require("../models/");
// const recipe = require("../models").recipe;
const recipe_ingredient = require("../models").recipe_ingredient;

const router = new Router();

// Get all recipes
router.get("/all", async (req, res, next) => {
  try {
    const allRecipes = await recipe.findAll({
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
          through: { attributes: [] }
        },
      ],
    });
    console.log("All recipes requested.");
    res.status(200).send(allRecipes);
  } catch (e) {
    console.log(e.message);
  }
});

// Get specific recipe by :id
router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipeId = parseInt(req.params.recipeId);
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
          through: { attributes: [] }
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
