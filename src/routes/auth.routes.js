import express from "express";
import UsersController from "../controllers/users.controller.js";
import path from "path";

const router = express.Router();

class AuthRouter {
  constructor() {
    this.controller = new UsersController();
  }
  start() {
    router.get("/", (req, res) => { res.redirect("/login")})
    router.get("/login", (req, res) => { const username = req.headers.username;
      if (username) {
        res.redirect("/productos/");
      } else {
        res.render(path.join(process.cwd(), "/src/views/pages/login.ejs"));
      }})
    router.post("/register", this.controller.saveUser);
    router.post("/login", this.controller.loginUser);
    return router;
  }
}

export default AuthRouter;
