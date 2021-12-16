const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const { ingredient, recipe, tag } = require("../models/");
const recipe_ingredient = require("../models").recipe_ingredient;
const recipe_tag = require("../models").recipe_tag;
const { Op } = require("sequelize");

const router = new Router();

// #################### Get all recipes of user ####################
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
          attributes: ["id", "title"],
          through: { attributes: ["quantity", "unit_singular", "unit_plural"] },
        },
        {
          model: tag,
          as: `tags`,
          required: false,
          attributes: ["id", "title"],
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

// #################### Get all recipes of user and matching search query ####################
router.post("/all/:userId", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const splitSearch = req.body.search.split(" ").map((e) => e.trim());

    // ########## Find tags matching 1 search word and return their Ids
    const tagMatch = await tag.findAll({
      where: {
        [Op.or]: splitSearch.map((searchWord) => {
          const ingr = { title: { [Op.iLike]: `%${searchWord}%` } };
          return ingr;
        }),
      },
      attributes: ["id", "title"],
    });
    // console.log("tagMatch", tagMatch);

    const tagMatchIds = tagMatch.map((t) => {
      return t.id;
    });

    // console.log("tagMatchIds", tagMatchIds);

    // Find recipe_tag relations where recipeIds are equal && tagId matches all search tagIds, return recipeIds
    // TO DO: only return recipeIds if tag matches all search words
    const recipeTagMatch = await recipe_tag.findAll({
      where: {
        tagId: tagMatchIds,
      },
      attributes: ["recipeId"],
    });
    // console.log("recipeTagMatch", recipeTagMatch);

    const recipeTagMatchIds = recipeTagMatch.map((t) => {
      return t.recipeId;
    });

    // console.log("recipeIngredientMatchIds", recipeIngredientMatchIds);

    // ########## Find ingredients matching 1 search word and return their Ids
    const ingredientMatch = await ingredient.findAll({
      where: {
        [Op.or]: splitSearch.map((searchWord) => {
          const ingr = { title: { [Op.iLike]: `%${searchWord}%` } };
          return ingr;
        }),
      },
      attributes: ["id", "title"],
    });
    // console.log("ingredientMatch", ingredientMatch);

    const ingredientMatchIds = ingredientMatch.map((i) => {
      return i.id;
    });

    // console.log("ingredientMatchIds", ingredientMatchIds);

    // Find recipe_ingredient relations where recipeIds are equal && ingredientId matches all search ingredientIds, return recipeIds
    // TO DO: only return recipeIds if ingredient matches all search words
    const recipeIngredientMatch = await recipe_ingredient.findAll({
      where: {
        ingredientId: ingredientMatchIds,
      },
      attributes: ["recipeId"],
    });
    // console.log("recipeIngredientMatch", recipeIngredientMatch);

    const recipeIngredientMatchIds = recipeIngredientMatch.map((i) => {
      return i.recipeId;
    });

    // console.log("recipeIngredientMatchIds", recipeIngredientMatchIds);

    // ########## Find and return recipes where title/ingredients/tags contain search words
    const recipeMatch = await recipe.findAll({
      where: {
        userId: userId,
        [Op.or]: splitSearch.map((searchWord) => {
          const search = { title: { [Op.iLike]: `%${searchWord}%` } };
          return search;
        }),
        [Op.or]: { id: recipeIngredientMatchIds },
        [Op.or]: { id: recipeTagMatchIds },
      },
      attributes: ["id", "title", "cookingTime", "imageUrl"],
      include: [
        {
          model: tag,
          as: `tags`,
          required: false,
          attributes: ["id", "title"],
          through: { attributes: [] },
        },
      ],
    });
    // console.log("All recipes requested for user:", userId, "searching", );
    res.status(200).send(recipeMatch);
  } catch (e) {
    console.log(e.message);
  }
});

// #################### Get specific recipe by :id ####################
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
          attributes: ["id", "title"],
          through: { attributes: ["quantity", "unit_singular", "unit_plural"] },
        },
        {
          model: tag,
          as: `tags`,
          required: false,
          attributes: ["id", "title"],
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

// #################### Add new recipe, with ingredients & tags ####################
router.post("/new", async (req, res) => {
  try {
    console.log("Apperently someone is trying to post a new recipe.");
    // console.log("req.body:", req.body);
    // Create and save the recipe
    const newRecipe = await recipe.create(req.body);

    // Loop through all the items in req.ingredients
    for (const ingredientToAdd of req.body.ingredients) {
      // console.log("ingedrientToAdd", ingredientToAdd);
      // Search for the ingredient with the givenTitle and make sure it exists. If it doesn't, create newIngredient.
      const [Ingredient] = await ingredient.findOrCreate({
        where: {
          title: ingredientToAdd.title,
        },
      });
      // console.log("Ingredient", Ingredient);
      // Create a dictionary with which to create the RecipeIngredient
      const rec_ing = {
        recipeId: newRecipe.id,
        ingredientId: Ingredient.id,
        quantity: ingredientToAdd.recipe_ingredients.quantity,
        unit_singular: ingredientToAdd.recipe_ingredients.unit_singular,
        unit_plural: ingredientToAdd.recipe_ingredients.unit_plural,
      };
      // console.log("rec_ing", rec_ing);
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
    return res.status(201).json(newRecipe);
  } catch (e) {
    console.log(e.message);
  }
});

// #################### Update recipe, with ingredients & tags ####################
router.put("/:recipeId", async (req, res) => {
  try {
    const recipeId = parseInt(req.params.recipeId);
    console.log("Apperently someone is trying to update recipe", recipeId);
    // console.log("req.body:", req.body);

    // Find recipe to update
    const recipeToUpdate = await recipe.findByPk(recipeId);

    // If found, update the recipe
    if (!recipeToUpdate) {
      res.status(404).send("Recipe not found");
    } else {
      const updatedRecipe = await recipeToUpdate.update(req.body);
    }
    // INGREDIENTS

    // Remove ingredient associations for ingredients no longer used

    // Get [] of Ids for submitted ingredients that already exist
    const ingredientTitles = req.body.ingredients.map((ingr) => {
      return ingr.title;
    });
    const existingIngredients = await ingredient.findAll({
      where: {
        title: ingredientTitles,
      },
      attributes: ["id", "title"],
    });
    // console.log("existingIngredients", existingIngredients);
    const existingIngredientIds = existingIngredients.map((ingr) => {
      return ingr.id;
    });

    // console.log("existingIngredientIds", existingIngredientIds);

    // Delete existing recipe_ingredient associations for ingredients not submitted
    const surplusRecipeIngredient = await recipe_ingredient.destroy({
      where: {
        recipeId: recipeId,
        [Op.not]: [{ ingredientId: existingIngredientIds }],
      },
    });
    // console.log("surplusRecipeIngredient", surplusRecipeIngredient);

    // Loop through all the submitted ingredients
    for (const ingredientToAdd of req.body.ingredients) {
      // console.log("ingedrientToAdd", ingredientToAdd);
      // Search for the ingredient with the givenTitle and make sure it exists. If it doesn't, create newIngredient.
      const [Ingredient] = await ingredient.findOrCreate({
        where: {
          title: ingredientToAdd.title,
        },
      });

      // Find existing recipe_ingredient associations
      const existingRecIng = await recipe_ingredient.findOne({
        where: {
          recipeId: recipeId,
          ingredientId: Ingredient.id,
        },
      });
      // console.log("existingRecIng", existingRecIng);

      if (!existingRecIng) {
        // If not present: create recipe_ingredient association
        const newRecIng = {
          recipeId: recipeId,
          ingredientId: Ingredient.id,
          quantity: ingredientToAdd.recipe_ingredients.quantity,
          unit_singular: ingredientToAdd.recipe_ingredients.unit_singular,
          unit_plural: ingredientToAdd.recipe_ingredients.unit_plural,
        };
        const createdRecipeIngredient = await recipe_ingredient.create(
          newRecIng
        );
        // console.log("createdRecipeIngredient", createdRecipeIngredient);
      } else {
        // If present: update recipe_ingredient association
        const updatedRecipeIngredient = await recipe_ingredient.update(
          {
            quantity: ingredientToAdd.recipe_ingredients.quantity,
            unit_singular: ingredientToAdd.recipe_ingredients.unit_singular,
            unit_plural: ingredientToAdd.recipe_ingredients.unit_plural,
          },
          {
            where: {
              recipeId: recipeId,
              ingredientId: Ingredient.id,
            },
          }
        );
        // console.log("updatedRecipeIngredient", updatedRecipeIngredient);
      }
    }

    // TAGS
    // Remove tag associations for tags no longer used
    // Get [] of Ids for submitted tags that already exist
    const tagTitles = req.body.tags.map((tag) => {
      return tag.title;
    });
    const existingTags = await tag.findAll({
      where: {
        title: tagTitles,
      },
      attributes: ["id", "title"],
    });
    // console.log("existingTags", existingTags);
    const existingTagIds = existingTags.map((tag) => {
      return tag.id;
    });

    // console.log("existingTagIds", existingTagIds);

    // Delete existing recipe_tag associations for tags not submitted
    const surplusRecipeTag = await recipe_tag.destroy({
      where: {
        recipeId: recipeId,
        [Op.not]: [{ tagId: existingTagIds }],
      },
    });
    // console.log("surplusRecipeTag", surplusRecipeTag);

    // Loop through all the submitted tags
    for (const tagToAdd of req.body.tags) {
      // console.log("tagToAdd", tagToAdd);
      // Search for the tag with the givenTitle and make sure it exists. If it doesn't, create newTag.
      const [Tag] = await tag.findOrCreate({
        where: {
          title: tagToAdd.title,
        },
      });

      // Search for existing recipe_tag association, create if none.
      const RecTagToAdd = await recipe_tag.findOrCreate({
        where: {
          recipeId: recipeId,
          tagId: Tag.id,
        },
      });
      // console.log("RecTagToAdd", RecTagToAdd);
    }

    // If everything goes well, respond with the recipe.
    return res.status(201).json(updatedRecipe);
  } catch (e) {
    console.log(e.message);
  }
});

// #################### Delete specific recipe by :id ####################
router.delete("/:recipeId", async (req, res, next) => {
  try {
    const recipeId = parseInt(req.params.recipeId);
    console.log(recipeId);

    // Find recipe to delete
    const recipeToDelete = await recipe.findByPk(recipeId);

    // If found, delete the recipe & its ingredient+tag associations
    if (!recipeToDelete) {
      res.status(404).send("Recipe not found");
    } else {
      const deletedRecipe = await recipe.destroy({
        where: {
          id: recipeId,
        },
      });
      const deletedRecipeIngredients = await recipe_ingredient.destroy({
        where: {
          recipeId: recipeId,
        },
      });
      const deletedRecipeTag = await recipe_tag.destroy({
        where: {
          recipeId: recipeId,
        },
      });
      return res
        .status(200)
        .json(deletedRecipe, deletedRecipeIngredients, deletedRecipeTag);
    }
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
