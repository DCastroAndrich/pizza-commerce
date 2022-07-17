import express from "express";
import OrdersController from "../controllers/orders.controller.js";
import { auth } from "../auth/jwt.verify.js";

const router = express.Router();

class OrdersRouter {
  constructor() {
    this.controller = new OrdersController();
  }
  start() {
    router.get("/", this.controller.getAllOrders);
    router.get("/:id", this.controller.getOrder);
    router.post("/",  this.controller.saveOrder);
    router.put("/:id",  this.controller.updateOrder);
    router.delete("/:id", this.controller.deleteOrder);
    return router;
  }
}
export default OrdersRouter;
