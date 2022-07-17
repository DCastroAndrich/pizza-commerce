import config from "../utils/config.js";
import ProductsDAOMongo from "../services/products/ProductsDAO.mongo.js";
import ProductsDAOMem from "../services/products/ProductsDAO.mem.js";

class ProductsDAOFactory {
  static get() {
    switch (config.srv.PERSISTENCE) {
      case "MONGOATLAS":
        return new ProductsDAOMongo();
      case "MEM":
        return new ProductsDAOMem();
      default:
        return;
    }
  }
}

export default ProductsDAOFactory;
