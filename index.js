const express = require("express");
const loggerMiddleWare = require("morgan");
const corsMiddleWare = require("cors");
const { PORT } = require("./config/constants");
const recipeRouter = require("./routers/recipes");
const authRouter = require("./routers/auth");
const { ingredient, recipe, tag } = require("./models/");

const app = express();
app.use(corsMiddleWare());
app.use(loggerMiddleWare("dev"));
const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

app.use("/auth", authRouter);
app.use("/recipe", recipeRouter);

// Get all ingredients
app.get("/ingredients", async (req, res, next) => {
  try {
    const allIngredients = await ingredient.findAll({
      attributes: ["id", "title"],
    });

    res.status(200).send(allIngredients);
  } catch (e) {
    console.log(e.message);
  }
});

// Get all tags
app.get("/tags", async (req, res, next) => {
  try {
    const allTags = await tag.findAll({
      attributes: ["id", "title"],
    });

    res.status(200).send(allTags);
  } catch (e) {
    console.log(e.message);
  }
});

// // GET endpoint for testing purposes, can be removed
// app.get("/", (req, res) => {
//   res.send("Hi from express");
// });

// // POST endpoint for testing purposes, can be removed
// app.post("/echo", (req, res) => {
//   res.json({
//     youPosted: {
//       ...req.body,
//     },
//   });
// });

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
