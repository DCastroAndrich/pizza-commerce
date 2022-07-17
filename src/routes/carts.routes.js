import express from "express";
import CartsController from "../controllers/carts.controller.js";
import { auth } from "../auth/jwt.verify.js";

const router = express.Router();

class CartsRouter {
  constructor() {
    this.controller = new CartsController();
  }
  start() {
    router.get("/", this.controller.getAllCarts);
    router.get("/:id",  this.controller.getCart);
    router.post("/",  this.controller.newCart);
    router.post("/:id/:id_prod", this.controller.saveProdToCart)
    router.delete("/:id/:id_prod", this.controller.eraseProdFromCart)
    router.put("/:id", this.controller.updateCart);
    router.delete("/:id", this.controller.deleteCart);
    return router;
  }
}

export default CartsRouter;
