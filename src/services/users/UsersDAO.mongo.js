import CustomError from "../../classes/CustomError.class.js";
import logger from "../../utils/logger.js";
import MongoAtlasClient from "../../classes/MongoAtlasClient.class.js";
import UserModel from "../../models/User.model.js";
import config from "../../utils/config.js";
import CryptoJS from "crypto-js";
import { generateToken } from "../../auth/jwt.verify.js";

const PASS_SEC = config.crypt.PASS_SECRET;

class UsersDAOMongo {
  constructor() {
    this.collection = UserModel;
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
      const err = new CustomError(500, "Error getting all users", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`${docs.length} users found`);
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
      const err = new CustomError(500, "Error getting user", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`User found: ${JSON.stringify(doc)}`);
    }
  }

  async save(userdata) {
    let doc = null;
    try {
      await this.connection.connect();

      const userExists = await this.collection.findOne({
        username: userdata.username,
      });
      if (userExists) {
        return { message: "Username already exists" };
      }

      const { password } = userdata;

      const hash = CryptoJS.AES.encrypt(
        JSON.stringify(password),
        PASS_SEC
      ).toString();

      const newUser = new this.collection({ ...userdata, password: hash });

      doc = await newUser.save();

      logger.info(doc);
      const access_token = generateToken(newUser);

      return access_token;
    } catch (error) {
      const err = new CustomError(500, "Error saving new user", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
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
      const err = new CustomError(500, "Error deleting user", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`User deleted successfully: ${JSON.stringify(doc)}`);
    }
  }

  /* async login(userData) {
    let user;

    try {
      await this.connection.connect();
      user = await this.collection.findOne({
        userName: userData.username,
      });
      if (!user) {
        return { message: "Wrong user name" };
      }

      const hashedPassword = CryptoJS.AES.decrypt(user.password, PASS_SEC);
      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      let inputPassword = userData.password;
      if (originalPassword != inputPassword) {
        return { message: "Password mismatch" };
      }

      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        PRIVATE_KEY,
        { expiresIn: "2h" }
      );

      const { password, ...other } = user.doc;

      return { ...other, accessToken };
    } catch (error) {
      const err = new CustomError(500, "Error login user", error);
      logger.error(err);
      throw err;
    } finally {
      this.connection.disconnect();
      logger.info(`User login successfully: ${JSON.stringify(doc)}`);
    }
  } */
}

export default UsersDAOMongo;
