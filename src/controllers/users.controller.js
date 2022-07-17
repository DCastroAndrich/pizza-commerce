import CustomError from "../classes/CustomError.class.js";
import UsersDAOMongo from "../services/users/UsersDAO.mongo.js";
import MongoAtlasClient from "../classes/MongoAtlasClient.class.js";
import UserModel from "../models/User.model.js";
import config from "../utils/config.js";
import CryptoJS from "crypto-js";
import logger from "../utils/logger.js";
import { generateToken } from "../auth/jwt.verify.js";

const Connection = new MongoAtlasClient();
const PASS_SEC = config.crypt.PASS_SECRET;
const DAO = new UsersDAOMongo();

class UsersController {
  getAllUsers = async (req, res) => {
    try {
      const docs = await DAO.getAll();
      res.status(200).json(docs);
    } catch (error) {
      throw new CustomError(500, "Error in 'getAllUsers' method", error);
    }
  };

  getUser = async (req, res) => {
    try {
      const doc = await DAO.getBy(req.params.id);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'getUser' method", error);
    }
  };
  saveUser = async (req, res) => {
    try {
      const doc = await DAO.save(req.body);
      res.status(200).json(doc);
    } catch (error) {
      throw new CustomError(500, "Error in 'saveUser' method", error);
    }
  };

  deleteUser = async (req, res) => {
    try {
      const doc = await DAO.deleteById(req.params.id);
      res.status(200).json(doc);
    } catch (error) {
      return new CustomError(500, "Error in 'deleteUser' method", error);
    }
  };

  loginUser = async (req, res) => {
    let user;
    try {
      await Connection.connect();
      user = await UserModel.findOne({
        userName: req.body.username,
      });
      if (!user) {
        return res.status(401).json("Wrong username");
      }

      const hashedPassword = await CryptoJS.AES.decrypt(
        user.password,
        PASS_SEC
      );
      const originalPassword = JSON.parse(
        hashedPassword.toString(CryptoJS.enc.Utf8)
      );
      const inputPassword = req.body.password;
      if (originalPassword != inputPassword) {
        return res.status(401).json("Wrong password");
      }

      const accessToken = generateToken(user);

      logger.info(req.headers);
      return res.status(200).json({ user, accessToken });
    } catch (error) {
      logger.info(error);
      return res.status(500).json(error);
    }
  };
}

export default UsersController;
