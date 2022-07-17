import CustomError from "../../classes/CustomError.class.js";
import DAO from "../../classes/DAO.class.js";
import logger from "../../utils/logger.js";
import MongoAtlasClient from "../../classes/MongoAtlasClient.class.js";
import CartModel from "../../models/Cart.model.js";
import ProductsModel from "../../models/Product.model.js";

class CartDAOMongo extends DAO {
  constructor() {
    super();
    this.collection = CartModel;
    this.connection = new MongoAtlasClient();
  }

  async getAll() {
    let docs = [];
    try {
      await this.connection.connect();
      docs = await this.collection.find({});
      logger.info(docs);
      return docs;
    } catch (error) {
      const err = new CustomError(500, "Error getting all carts", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`Carts found: ${docs.length}`);
    }
  }

  async getById(id) {
    let doc = null;

    try {
      await this.connection.connect();
      doc = await this.collection.find({ _id: id });
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error getting cart", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`Cart found: ${JSON.stringify(doc)}`);
    }
  }

  async save() {
    try {
      await this.connection.connect();
      const newCart = new this.collection();
      let doc = await newCart.save();
      logger.info(doc.id);
      return doc.id;
    } catch (error) {
      return new CustomError(500, "Error saving new cart", error);
    } finally {
      this.connection.disconnect();
      logger.info(`New cart saved successfully: cartId # ${doc.id}`);
    }
  }

  async update(id, prod) {
    let doc = null;
    try {
      await this.connection.connect();
      doc = await this.collection.findByIdAndUpdate(
        id,
        {
          $set: prod,
        },
        { new: true }
      );
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error updating cart", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`Cart updated: ${JSON.stringify(doc)}`);
    }
  }

  async deleteById(id) {
    let doc = null;
    try {
      await this.connection.connect();
      doc = await this.collection.findByIdAndDelete(id);
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error deleting cart", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`Cart deleted: ${JSON.stringify(doc)}`);
    }
  }

  async saveToCart(id, id_prod) {
    try {
      await this.connection.connect();
      let findProduct = await ProductsModel.find({ _id: id_prod });
      let filter = {_id: id}

      let result = await this.collection.findByIdAndUpdate(filter, {
        $push: {products: findProduct },
      });
      logger.info(result);
      return result;
    } catch (error) {
      const err = new CustomError(500, "Error saving product to cart", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`Product saved to cart: ${JSON.stringify(findProduct)}`);
    }
  }
  async eraseFromCart(id, id_prod) {
    try {
      await this.connection.connect();
      let findCart = await this.collection.findById(id);
      let result = await findCart.remove({products: id_prod});
      logger.info(result);
      return result;
    } catch (error) {
      logger.error(error);
    } finally {
      this.connection.disconnect();
      logger.info(`Product erased from cart: ${JSON.stringify(result)}`);
    }
  }
}

export default CartDAOMongo;
