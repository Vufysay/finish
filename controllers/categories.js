const sendAllCategories = (req, res) => {
  // Установим заголовок ответа в формате JSON
  res.setHeader("Content-Type", "application/json");
  // Отправим данные в виде JSON-объекта,
  // которые подготовим в миддлваре findAllCategories
  res.end(JSON.stringify(req.categoriesArray));
};
// controllers/categories.js
const sendCategoryCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));
};

const sendCategoryById = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));
};
const sendCategoryUpdated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({ message: "Категория обновлена" }));
};

const sendCategoryDeleted = (req, res) => {
  // Объект игры отправляем в формате JSON
  res.setHeader("Content-Type", "application/json");
  // Отправляем на клиент найденный и удалённый элемент из базы данных
  res.end(JSON.stringify(req.category));
};

// Экспортируем контроллер
((module.exports = sendAllCategories),
sendCategoryById,
sendCategoryUpdated,
sendCategoryDeleted),
  sendCategoryCreated;
