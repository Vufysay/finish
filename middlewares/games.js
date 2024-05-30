// middlewares/games.js

const findAllGames = async (req, res, next) => {
  // Поиск всех игр в проекте по заданной категории
  if (req.query["categories.name"]) {
    req.gamesArray = await games.findGameByCategory(
      req.query["categories.name"]
    );
    next();
    return;
  }
  // Поиск всех игр в проекте
  req.gamesArray = await games.find({}).populate("categories").populate({
    path: "users",
    select: "-password", // Исключим данные о паролях пользователей
  });
  next();
};

const checkIsVoteRequest = async (req, res, next) => {
  // Если в запросе присылают только поле users
  if (Object.keys(req.body).length === 1 && req.body.users) {
    req.isVoteRequest = true;
  }
  next();
};
if (req.isVoteRequest) {
  next();
  return;
}
