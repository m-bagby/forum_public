import commentRouter from "./routers/commentRouter.js";
import postRouter from "./routers/postRouter.js";
import userRouter from "./routers/userRouter.js";

const makeRoutes = (app) => {
  app.use("/comment", commentRouter);
  app.use("/comments", commentRouter);

  app.use("/post", postRouter);
  app.use("/posts", postRouter);

  app.use("/user", userRouter);
};

export default makeRoutes;