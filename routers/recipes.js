const { Router } = require("express");
// const authMiddleware = require("../auth/middleware");
const { ingredient, recipe, tag } = require("../models/");
// const recipe = require("../models").recipe;
const recipe_ingredient = require("../models").recipe_ingredient;

const router = new Router();

// Get all recipes of user
router.get("/all/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
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
    // console.log("All recipes requested for user:", userId);
    res.status(200).send(allRecipes);
  } catch (e) {
    console.log(e.message);
  }
});

// Get specific recipe by :id
router.get("/:recipeId", async (req, res, next) => {
  try {
    const recipeId = parseInt(req.params.recipeId);
    // console.log(recipeId);
    const specificRecipe = await recipe.findByPk(recipeId, {
      attributes: [
        "id",
        "title",
        "instructions",
        "cookingTime",
        "imageUrl",
        "reference",
      ],
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
    // console.log("Recipe with id", recipeId, "requested.");
    // console.log("specificRecipe:", specificRecipe);

    res.status(200).send(specificRecipe);
  } catch (e) {
    console.log(e.message);
  }
});

// Add new recipes, with ingredients & tags
router.post("/new", async (req, res) => {
  try {
    console.log("Apperently someone is trying to post a new recipe.");

    // Create and save the recipe
    const newRecipe = await recipe.create(req.body);

    // Loop through all the items in req.ingredients
    for (const ingredient of req.body.ingredients) {
      console.log("ingedrient", ingredient);
      // Search for the ingredient with the givenTitle and make sure it exists. If it doesn't, create newIngredient.
      const addIngredient = await ingredient.findOrCreate({
        where: { title: ingredient.title },
      });

      // Create a dictionary with which to create the RecipeIngredient
      const rec_ing = {
        recipeId: newRecipe.id,
        ingredientId: ingredient.id,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      };

      // Create and save a recipeIngredient
      const savedRecipeIngredient = await recipe_ingredient.create(rec_ing);
    }

    // Loop through all the items in req.tags
    for (const tag of req.body.tags) {
      // Search for the tag with the givenTitle and make sure it exists. If it doesn't, create newTag.
      const addTag = await tag.findOrCreate({
        where: { title: tag.title },
      });

      // Create a dictionary with which to create the RecipeTag
      const rec_tag = {
        recipeId: newTag.id,
        ingredientId: tag.id,
      };

      // Create and save a recipeIngredient
      const savedRecipeIngredient = await recipe_ingredient.create(rec_ing);
    }

    // If everything goes well, respond with the recipe.
    return res.status(200).json(newRecipe);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
