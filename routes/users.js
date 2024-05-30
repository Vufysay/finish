// Создаём роут для запросов пользователей
const usersRouter = require("express").Router();
const {
  sendAllUsers,
  sendUserById,
  sendMe,
  sendUserCreated,
  sendUserUpdated,
  sendUserDeleted,
} = require("../controllers/users");
const { checkAuth } = require("../middlewares/auth");

// Импортируем вспомогательные функции
const {
  findAllUsers,
  filterPassword,
  findUserById,
  checkEmptyNameAndEmailAndPassword,
  hashPassword,
  createUser,
  checkEmptyNameAndEmail,
  updateUser,
  deleteUser,
  checkIsUserExists,
} = require("../middlewares/users");
usersRouter.get("/users", findAllUsers, filterPassword, sendAllUsers);
usersRouter.get("/users/:id", findUserById, filterPassword, sendUserById);
usersRouter.get("/me", checkAuth, sendMe);

// Обрабатываем GET-запрос с роутом '/users'

// routes/users.js
// routes/users.js

// routes/users.js
usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);
usersRouter.delete("/users/:id", checkAuth, deleteUser, sendUserDeleted);

// Экспортируем роут для использования в приложении — app.js
module.exports = usersRouter;
