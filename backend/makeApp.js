import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const makeApp = (makeRoutesFunctions) => {
  const app = express();

  //Set CORS headers
  app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", "https://www.forum.markbagby.net");
    res.append("Access-Control-Allow-Methods", "*");
    res.append("Access-Control-Allow-Headers", "*");
    next();
  });

  //Connect to database
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect("mongodb+srv://" + USERNAME + ":" + PASSWORD + DB_URL, {useNewUrlParser: true});
  }
  catch (err) {
    console.log("error connecting to database");
    console.log(err);
  }

  //Add body parser
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  //Build router
  makeRoutesFunctions.forEach((makeRoutes) => {
    makeRoutes(app);
  });

  return app;
};

export default makeApp;