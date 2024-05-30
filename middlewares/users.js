// Файл middlewares/users.js

// Импортируем модель
const users = require("../models/user");
const bcrypt = require("bcryptjs"); // Импортируем bcrypt

const findAllUsers = async (req, res, next) => {
  // По GET-запросу на эндпоинт /users найдём все документы пользователей
  req.usersArray = await users.find({});
  next();
};

const createUser = async (req, res, next) => {
  try {
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    res.status(400).send("Ошибка при создании пользователя");
  }
};

// middlewares/users.js
const findUserById = async (req, res, next) => {
  console.log("GET /users/:id");
  try {
    req.user = await users.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Пользователь не найден" }));
  }
};

const updateUser = async (req, res, next) => {
  try {
    // В метод передаём id из параметров запроса и объект с новыми свойствами
    req.user = await games.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка обновления пользователя" }));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    // Методом findByIdAndDelete по id находим и удаляем документ из базы данных
    req.user = await games.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
  }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    // Если какое-то из полей отсутствует, то не будем обрабатывать запрос дальше,
    // а ответим кодом 400 — данные неверны.
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
  } else {
    // Если всё в порядке, то передадим управление следующим миддлварам
    next();
  }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
  if (!req.body.name || !req.body.email) {
    // Если какое-то из полей отсутствует, то не будем обрабатывать запрос дальше,
    // а ответим кодом 400 — данные неверны.
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
  } else {
    // Если всё в порядке, то передадим управление следующим миддлварам
    next();
  }
};

const filterPassword = (req, res, next) => {
  const filterUser = (user) => {
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  };
  if (req.user) {
    req.user = filterUser(req.user);
  }
  if (req.usersArray) {
    req.usersArray = req.usersArray.map((user) => filterUser(user));
  }

  next();
};

// middlewares/users.js

const hashPassword = async (req, res, next) => {
  try {
    // Создаём случайную строку длиной в десять символов
    const salt = await bcrypt.genSalt(10);
    // Хешируем пароль
    const hash = await bcrypt.hash(req.body.password, salt);
    // Полученный в запросе пароль подменяем на хеш
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
};

const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return req.body.email === user.email;
  });
  if (isInArray) {
    res
      .status(400)
      .send({ message: "Пользователь с таким email уже существует" });
  } else {
    next();
  }
};

// Экспортируем функцию поиска всех пользователей
module.exports = {
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  filterPassword,
  hashPassword,
  createUser,
  checkIsUserExists,
};
