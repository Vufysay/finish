const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const usersRouter = require("./routes/users");
const gamesRouter = require("./routes/games");
const categoriesRouter = require("./routes/categories");
const cookieParser = require("cookie-parser");

const connectToDatabase = require("./database/connect");
const cors = require("./middlewares/cors");
const { pagesRouter } = require("./routes/pages");
const apiRouter = require("./routes/api");

const app = express();
const PORT = 3000;

connectToDatabase();
// app.js
// Импорты и инициализация приложения

// Импорты и конфигурация приложения

app.use(
  cors,
  cookieParser(),
  bodyParser.json(),
  pagesRouter, // Добавляем роутер для страниц
  apiRouter,
  express.static(path.join(__dirname, "public"))
);

// Остальной код

// Запуск приложения

// Запуск приложения
app.listen(PORT);
