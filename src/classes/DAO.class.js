import CustomError from "./CustomError.class.js"

class DAO {
    async getAll() {
      throw new CustomError(500, "Method 'getAll' not implemented in subclass");
    }
    async getById() {
      throw new CustomError(500, "Method 'getById' not implemented in subclass");
    }
    async save() {
      throw new CustomError(500, "Method 'save' not implemented in subclass");
    }
    async update() {
      throw new CustomError(500, "Method 'update' not implemented in subclass");
    }
    async deleteById() {
      throw new CustomError(
        500,
        "Method 'deleteById' not implemented in subclass"
      );
    }
  }
  
  export default DAO;