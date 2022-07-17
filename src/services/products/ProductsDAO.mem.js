import CustomError from "../../classes/CustomError.class.js";
import DAO from "../../classes/DAO.class.js";
import logger from "../../utils/logger.js";

class ProductsDAOMem extends DAO {
  constructor() {
    super();
    this.collections = [];
  }

  getAll() {
    let docs = [];
    try {
      docs = this.collection;
      return docs;
    } catch (error) {
      const err = new CustomError(500, "Error getting all products", error);
      logger.error(err);
      throw err;
    } finally {
      logger.info(`${docs.length} products found`);
    }
  }

  getById(id) {
    let doc = null;

    try {
      doc = this.collection.find((doc) => {
        return doc.id === id;
      });
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error getting product", error);
      logger.error(err);
      throw err;
    } finally {
      logger.info(`Product found: ${JSON.stringify(doc)}`);
    }
  }

  save(obj) {
    let doc = null;
    try {
      let newId;
      if (this.collection.length == 0) {
        newId = 1;
      } else {
        newId = this.collection[this.collection.length - 1].id + 1;
      }
      doc = { ...obj, id: newId };
      this.collection.push(doc);
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error saving new product", error);
      logger.error(err);
      throw err;
    } finally {
      logger.info(`New product saved successfully: ${JSON.stringify(doc)}`);
    }
  }

  update(obj) {
    let doc = null;
    try {
      const index = this.collection.findIndex(
        (product) => product.id === obj.id
      );
      if (index == -1) {
        doc = { code: 401, msg: "ID not found" };
      } else {
        this.collection[index] = obj;
        doc = this.collection[index];
      }
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error updating product", error);
      logger.error(err);
      throw err;
    } finally {
      logger.info(`Product updated: ${JSON.stringify(doc)}`);
    }
  }

  deleteById(id) {
    let doc = null;
    try {
      const index = this.collection.findIndex((product) => product.id == id);
      if (id == -1) {
        doc = { code: 401, msg: "ID not found" };
      } else {
        doc = this.collection.splice(index, 1);
      }
      return doc;
    } catch (error) {
      const err = new CustomError(500, "Error deleting product", error);
      logger.error(err);
      throw err;
    } finally {
      logger.info(`Product deleted: ${JSON.stringify(doc)}`);
    }
  }
}

export default ProductsDAOMem;
