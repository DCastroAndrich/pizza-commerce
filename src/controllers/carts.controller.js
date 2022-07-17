import CustomError from "../classes/CustomError.class.js";
import CartsDAOFactory from "../classes/CartsDAOFactory.class.js";

const DAO = CartsDAOFactory.get();

class CartsController {
  getAllCarts = async (req, res) => {
    try {
      let docs = await DAO.getAll();
      return res.status(200).json(docs);
    } catch (error) {
      return new CustomError(500, "Error in 'getAllCarts' method", error);
    }
  };

  getCart = async (req, res) => {
    try {
      let doc = await DAO.getById(req.params.id);
      return res.status(200).json({response: "ok"}, doc);
    } catch (error) {
      return new CustomError(500, "Error in 'getCart' method", error);
    }
  };

  newCart = async (req, res) => {
    try {
      let doc = await DAO.save();
      return res.status(200).json({response: "ok"}, doc);
    } catch (error) {
      return new CustomError(500, "Error in 'saveCart' method", error);
    }
  };

  updateCart = async (req, res) => {
    let cartID = req.params.id;
    let prod = req.body;
    try {
      let doc = await DAO.update(cartID, prod);
      return res.status(200).json({response: "ok"}, doc);
    } catch (error) {
      return new CustomError(500, "Error in 'updateCart' method", error);
    }
  };

  deleteCart = async (req, res) => {
    let cartID = req.params.id;
    try {
      let doc = await DAO.deleteById(cartID);
      return res.status(200).json({response: "ok"}, doc);
    } catch (error) {
      return new CustomError(500, "Error in 'deleteCart' method", error);
    }
  };

  saveProdToCart = async (req, res) => {
    let cartID = req.params.id;
    let prodID = req.params.id_prod;
    try {
      let doc = await DAO.saveToCart(cartID, prodID);
      return res.status(200).json({response: "ok"}, doc);
    } catch (error) {
      return new CustomError(500, "Error in 'saveProdToCart' method", error);
    }
  };
  eraseProdFromCart = async (req, res) => {
    let cartID = req.params.id;
    let prodID = req.params.id_prod;
    try {
      let doc = await DAO.eraseFromCart(cartID, prodID);
      return res.status(200).json({response: "ok"}, doc);
    } catch (error) {
      return new CustomError(500, "Error in 'eraseProdFromCart' method", error);
    }
  };
}

export default CartsController;
