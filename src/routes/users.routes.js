import express from "express";
import UsersController from "../controllers/users.controller.js";


const router = express.Router();

class UsersRouter {
  constructor() {
    this.controller = new UsersController();
  }

  start() {
    router.get("/", this.controller.getAllUsers);
    router.get("/:id", this.controller.getUser);
    router.delete("/:id", this.controller.deleteUser);
    return router;
  }
}

export default UsersRouter;
