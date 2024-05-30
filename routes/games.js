// Файл routes/games.js

const gamesRouter = require("express").Router();
const { checkAuth } = require("../middlewares/auth.js");

const {
  findAllGames,
  findGameById,
  checkIsGameExists,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkIsVoteRequest,
  checkIfUsersAreSafe,
} = require("../middlewares/games");
const { sendGameById } = require("../controllers/games");

gamesRouter.get("/games/:id", findGameById, sendGameById);

// Файл routes/games.js

// Пока запишем порядок действий псевдокодом
// Файл routes/games.js

// Пока запишем порядок действий псевдокодом
// Файл routes/games.js

gamesRouter.post(
  "/games",
  findAllGames,
  checkIsGameExists,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth
  // Другие миддлвары и контроллеры
);

// Маршрут для обновления игры
gamesRouter.put(
  "/games/:id",
  findGameById,
  checkIsVoteRequest,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth
  // Другие миддлвары и контроллеры
);

// Маршрут для удаления игры
gamesRouter.delete(
  "/games/:id",
  checkAuth
  // Другие миддлвары и контроллеры
);

module.exports = gamesRouter;
