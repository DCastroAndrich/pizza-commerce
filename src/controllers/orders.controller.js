import CustomError from "../classes/CustomError.class.js";
import OrdersDAOMongo from "../services/orders/OrdersDAO.mongo.js";
const DAO = new OrdersDAOMongo();

class OrdersController {
  getAllOrders = async (req, res) => {
    try {
      let docs = await DAO.getAll();
      res.status(200).json(docs);
    } catch (error) {
      throw new CustomError(500, "Error in 'getAllOrders' method", error);
    }
  };

  getOrder = async (req, res) => {
    try {
      let doc = await DAO.getById(req.params.id);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'getOrder' method", error);
    }
  };

  saveOrder = async (req, res) => {
    try {
      let doc = await DAO.save(req.body);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'saveOrder' method", error);
    }
  };

  updateOrder = async (req, res) => {
    let orderID = req.params.id;
    let obj = req.body;
    try {
      let doc = await DAO.update(orderID, obj);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'updateOrder' method", error);
    }
  };

  deleteOrder = async (req, res) => {
    let orderID = req.params.id;
    try {
      let doc = await DAO.deleteById(orderID);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'deleteOrder' method", error);
    }
  };
}

export default OrdersController;
