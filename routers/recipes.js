const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const { ingredient, recipe, tag } = require("../models/");
const recipe_ingredient = require("../models").recipe_ingredient;
const recipe_tag = require("../models").recipe_tag;

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
    console.log("req.body:", req.body);
    // Create and save the recipe
    const newRecipe = await recipe.create(req.body);

    // Loop through all the items in req.ingredients
    for (const ingredientToAdd of req.body.ingredients) {
      console.log("ingedrientToAdd", ingredientToAdd);
      // Search for the ingredient with the givenTitle and make sure it exists. If it doesn't, create newIngredient.
      const [Ingredient] = await ingredient.findOrCreate({
        where: {
          title: ingredientToAdd.title,
        },
      });
      console.log("Ingredient", Ingredient);
      // Create a dictionary with which to create the RecipeIngredient
      const rec_ing = {
        recipeId: newRecipe.id,
        ingredientId: Ingredient.id,
        quantity: ingredientToAdd.recipe_ingredients.quantity,
        unit_singular: ingredientToAdd.recipe_ingredients.unit_singular,
        unit_plural: ingredientToAdd.recipe_ingredients.unit_plural,
      };
      console.log("rec_ing", rec_ing);
      // Create and save a recipeIngredient
      const savedRecipeIngredient = await recipe_ingredient.create(rec_ing);
    }

    // Loop through all the items in req.tags
    for (const tagToAdd of req.body.tags) {
      // Search for the tag with the givenTitle and make sure it exists. If it doesn't, create newTag.
      const [Tag] = await tag.findOrCreate({
        where: { title: tagToAdd.title },
      });

      // Create a dictionary with which to create the RecipeTag
      const rec_tag = {
        recipeId: newRecipe.id,
        tagId: Tag.id,
      };

      // Create and save a recipeTag
      const savedRecipeTag = await recipe_tag.create(rec_tag);
    }

    // If everything goes well, respond with the recipe.
    return res.status(200).json(newRecipe);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
