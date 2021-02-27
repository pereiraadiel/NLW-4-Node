import { Router } from "express";
import { SurveyController } from "./controllers/SurveyController";
import { UserController } from "./controllers/UserController";

const routes = Router();

const userController = new UserController();
const surveyController = new SurveyController();

routes.get("/", (req, res) => {
  return res.json({
    message: "Hello World!",
  });
});

routes.post("/users", userController.create);

routes.post("/surveys", surveyController.create);
routes.get("/surveys", surveyController.index);

export default routes;
