import express from "express";
import ProductsController from "../controllers/products.controller.js";
import { auth } from "../auth/jwt.verify.js";

const router = express.Router();

class ProductsRouter {
  constructor() {
    this.controller = new ProductsController();
  }

  start() {
    router.get("/", this.controller.getAllProducts);
    router.get("/:id", this.controller.getProduct);
    router.post("/", this.controller.saveProduct);
    router.put("/:id", this.controller.updateProduct);
    router.delete("/:id", this.controller.deleteProduct);
    return router;
  }
}

export default ProductsRouter;
