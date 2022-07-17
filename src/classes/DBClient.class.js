import CustomError from "./CustomError.class.js"

class DBClient {
    async connect() {
        throw new CustomError(500, "Method 'connect' not implemented in subclass");
    }
    async disconnect() {
        throw new CustomError(500, "Method 'disconnect' not implemented in subclass")
    }
}

export default DBClient