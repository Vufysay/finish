// Создаём роут для запросов категорий
const categoriesRouter = require("express").Router();

// Импортируем вспомогательные функции
const findAllCategories = require("../middlewares/categories");
const sendAllCategories = require("../controllers/categories");

categoriesRouter.get("/categories/:id", findCategoryById, sendCategoryById);

// routes/categories.js
categoriesRouter.post(
  "/categories",
  findAllCategories,
  checkIsCategoryExists,
  checkEmptyName,
  checkAuth,
  createCategory,
  sendCategoryCreated
);
categoriesRouter.put(
  "/categories/:id",
  checkEmptyName,
  checkAuth,
  updateCategory,
  sendCategoryUpdated
);
categoriesRouter.delete(
  "/categories/:id",
  checkAuth,
  deleteCategory,
  sendCategoryDeleted
);

// Экспортируем роут для использования в приложении — app.js
module.exports = categoriesRouter;
