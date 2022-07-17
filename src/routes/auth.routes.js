import express from "express";
import UsersController from "../controllers/users.controller.js";

const router = express.Router();

class AuthRouter {
  constructor() {
    this.controller = new UsersController();
  }
  start() {
    router.post("/register", this.controller.saveUser);
    router.post("/login", this.controller.loginUser);
    return router;
  }
}

export default AuthRouter;
