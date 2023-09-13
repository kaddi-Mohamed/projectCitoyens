const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const dbconnetion = require("./data/dataAcesse");
const ideaRouter = require("./router/ideaRouter");
const userRouter = require("./router/userRouter");
const authRouter = require("./router/authRouter");
const commentRouter = require("./router/commentRouter");
const passwordRouter = require("./router/passwordRouter");
const historicalRouter = require("./router/historicalRouter");
const favoriteRouter = require("./router/FavoriteRouter");
const likeRouter = require("./router/likeRouter");
const config = require("config");
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
const { errorHandler } = require("./middleware/errorHandler");
const { logger } = require("./middleware/logger");
dbconnetion.getConnection();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(logger);
app.use("/image", express.static("image"));
app.use("/api/v1/idea", ideaRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/favorite", favoriteRouter);
app.use("/api/v1/password", passwordRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/historical", historicalRouter);
app.use(errorHandler);

const port = config.get("port");
app.listen(port, () => {
  console.log(`server runing in port ${port}`);
});
