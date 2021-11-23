const express = require("express");
const loggerMiddleWare = require("morgan");
const { PORT } = require("./config/constants");
const ingredient = require("./models/").ingredient;
const recipe = require("./models").recipe;
const recipe_ingredient = require("./models").recipe_ingredient;

const app = express();
app.use(loggerMiddleWare("dev"));

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

// app.get("/", (req, res) => {
//   res.send("Hi from express");
// });

// Get all recipes
app.get("/", async (req, res, next) => {
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
      ],
    });
    console.log("All recipes requested.");
    res.status(200).send(allRecipes);
  } catch (e) {
    console.log(e.message);
  }
});

/**
 * Routes
 *
 * DEFINE YOUR ROUTES AFTER THIS MESSAGE (now that middlewares are configured)
 */

// GET endpoint for testing purposes, can be removed
app.get("/", (req, res) => {
  res.send("Hi from express");
});

// POST endpoint for testing purposes, can be removed
app.post("/echo", (req, res) => {
  res.json({
    youPosted: {
      ...req.body,
    },
  });
});

// // POST endpoint which requires a token for testing purposes, can be removed
// app.post("/authorized_post_request", authMiddleWare, (req, res) => {
//   // accessing user that was added to req by the auth middleware
//   const user = req.user;
//   // don't send back the password hash
//   delete user.dataValues["password"];

//   res.json({
//     youPosted: {
//       ...req.body,
//     },
//     userFoundWithToken: {
//       ...user.dataValues,
//     },
//   });
// });

// Listen for connections on specified port (default is port 4000)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
