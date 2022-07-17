import CustomError from "../classes/CustomError.class.js";
import ProductsDAOFactory from "../classes/ProductsDAOFactory.class.js";

const DAO = ProductsDAOFactory.get();

class ProductsController {
  getAllProducts = async (req, res) => {
    try {
      const docs = await DAO.getAll(req.params.value);

      res.status(200).json({response: "ok"}, docs);
    } catch (error) {
      return new CustomError(500, "Error in 'getAllProducts' method", error);
    }
  };

  getProduct = async (req, res) => {
    try {
      const doc = await DAO.getById(req.params.id);
      res.status(200).json({response: "ok"}, doc);
    } catch (error) {
      return new CustomError(500, "Error in 'getProduct' method", error);
    }
  };

  saveProduct = async (req, res) => {
    try {
      const doc = await DAO.save(req.body);

      res.status(200).json({response: "ok", ...doc });
    } catch (error) {
      return new CustomError(500, "Error in 'saveProduct' method", error);
    }
  };

  updateProduct = async (req, res) => {
    let prodId = req.params.id;
    let prod = req.body;
    try {
      const doc = await DAO.update(prodId, prod);
      res.status(200).json({response: "ok", ...doc });
    } catch (error) {
      return new CustomError(500, "Error in 'updateProduct' method", error);
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const doc = await DAO.deleteById(req.params.id);
      res.status(200).json({response: "ok"}, doc);
    } catch (error) {
      return new CustomError(500, "Error in 'deleteProduct' method", error);
    }
  };
}

export default ProductsController;
