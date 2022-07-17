import CustomError from "../../classes/CustomError.class.js";
import DAO from "../../classes/DAO.class.js";
import logger from "../../utils/logger.js";
import MongoAtlasClient from "../../classes/MongoAtlasClient.class.js";
import ProductModel from "../../models/Product.model.js";

class ProductsDAOMongo extends DAO {
  constructor() {
    super();
    this.collection = ProductModel;
    this.connection = new MongoAtlasClient();
  }

  async getAll(params) {
    let docs = [];
    const queryNew = params;
    const queryCategory = params;
    try {
      await this.connection.connect();
      if (queryNew) {
        docs = await this.collection.find().sort({ createdAt: -1 }).limit(1);
      } else if (queryCategory) {
        docs = await this.collection.find({categories: { queryCategory },
        });
      } else {
        docs = await this.collection.find({});
      }

      logger.info(docs);
      return docs;
    } catch (error) {
      const err = new CustomError(500, "Error getting all products", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`${docs.length} products found`);
    }
  }
  async getById(id) {
    let doc = null;
    try {
      await this.connection.connect();
      doc = await this.collection.findById(id);
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error getting product", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`Product found: ${JSON.stringify(doc)}`);
    }
  }
  async save(obj) {
    let doc = null;
    try {
      await this.connection.connect();
      doc = await this.collection.create(obj);
      logger.info(doc);
      return obj;
    } catch (error) {
      const err = new CustomError(500, "Error saving new product", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`New product saved successfully: ${JSON.stringify(doc)}`);
    }
  }

  async update(id, prod) {
    let doc = null;
    try {
      await this.connection.connect();
      doc = await this.collection.findByIdAndUpdate(
        id,
        { $set: prod },
        { new: true }
      );
      logger.info(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error updating product", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`Product updated successfully: ${JSON.stringify(doc)}`);
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
      const err = new CustomError(500, "Error deleting product", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`Product deleted successfully: ${JSON.stringify(doc)}`);
    }
  }
}

export default ProductsDAOMongo;
