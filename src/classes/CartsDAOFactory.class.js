import config from "../utils/config.js";
import CartsDAOMem from "../services/carts/CartsDAO.mem.js";
import CartsDAOMongo from "../services/carts/CartsDAO.mongo.js";

class CartsDAOFactory {
  static get() {
    switch (config.srv.PERSISTENCE) {
      case "MONGOATLAS":
        return new CartsDAOMongo();
      case "MEM":
        return new CartsDAOMem();

      default:
        return;
    }
  }
}

export default CartsDAOFactory;
