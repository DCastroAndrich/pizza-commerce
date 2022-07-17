import CustomError from "../../classes/CustomError.class.js";
import DAO from "../../classes/DAO.class.js";
import logger from "../../utils/logger.js";
import MongoAtlasClient from "../../classes/MongoAtlasClient.class.js";
import OrderModel from "../../models/Order.model.js";

class OrderDAOMongo extends DAO {
  constructor() {
    super();
    this.collection = OrderModel;
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
      const err = new CustomError(500, "Error getting all orders", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`Orders found: ${docs.length}`);
    }
  }

  async getById(id) {
    let doc = null;

    try {
      await this.connection.connect();
      doc = await this.collection.find({ userID: id });
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error getting order", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`Order found: ${JSON.stringify(doc)}`);
    }
  }

  async save(obj) {
    let doc = null;
    try {
      await this.connection.connect();
      doc = await this.collection.save(obj);
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error saving new order", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`New order saved successfully: ${JSON.stringify(doc)}`);
    }
  }

  async update(id, obj) {
    let doc = null;
    try {
      await this.connection.connect();
      doc = await this.collection.findByIdAndUpdate(
        id,
        {
          $set: obj,
        },
        { new: true }
      );
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error updating order", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`Order updated: ${JSON.stringify(doc)}`);
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
      const err = new CustomError(500, "Error deleting order", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`Order deleted: ${JSON.stringify(doc)}`);
    }
  }
}

export default OrderDAOMongo;
