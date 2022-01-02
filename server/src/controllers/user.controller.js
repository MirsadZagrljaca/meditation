import User from "../models/user.model";
import _, { join } from "lodash";
import errorHandler from "../helpers/dbErrorHandler";
const crypto = require("crypto");
import cache from "../../../cache/cache";

const encryptPassword = (password, salt) => {
  try {
    return crypto.createHmac("sha1", salt).update(password).digest("hex");
  } catch (err) {
    return "";
  }
};

const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.json({ error: "User not found" });
    }
    req.profile = user;
    next();
  });
};

const create = (req, res, next) => {
  const user = new User(req.body);

  user.save((err, result) => {
    if (err) {
      return res.json({ error: errorHandler.getErrorMessage(err) });
    }
    res.status(200).json({ message: "Successfully created account!" });
  });
};

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.json({
        error: errorHandler.getErrorMessage(err),
      });
    }
    res.json(users);
  }).select(
    "_id username email favorites progress longestStreak totalSessions mindfulMinutes longest"
  );
};

const read = (req, res) => {
  res.status(200).json(req.profile);
};

const remove = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return res.json({ error: errorHandler.getErrorMessage(err) });
    }
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;

    cache._id = "";
    cache.username = "";
    cache.email = "";
    cache.favorites = [];
    cache.progress = "";
    cache.longestStreak = [];
    cache.totalSessions = 0;
    cache.mindfulMinutes = "";
    cache.longest = 0;

    res.json(deletedUser);
  });
};

const update = (req, res, next) => {
  let user = req.profile;
  let data = req.body;

  if (data.password) {
    if (data.password !== "") {
      data.hashed_password = encryptPassword(data.password, user.salt);
      delete data.password;
    }
  }

  user = _.extend(user, data);
  user.updated = Date.now();

  cache._id = user._id;
  cache.email = user.email;
  cache.username = user.username;
  cache.favorites = user.favorites;
  cache.progress = user.progress;
  cache.longestStreak = user.longestStreak;
  cache.totalSessions = user.totalSessions;
  cache.mindfulMinutes = user.mindfulMinutes;
  cache.longest = user.longest;

  user.save((err) => {
    if (err) {
      return res.json({ error: errorHandler.getErrorMessage(err) });
    }

    user.hashed_password = undefined;
    user.salt = undefined;
    res.status(200).json(user);
  });
};

const checkPassword = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      return res.json({ error: "User not found" });
    }

    if (!user.authenticate(req.body.password)) {
      return res.json({ error: "Email and password don't match" });
    }

    return res.status(200).json({
      message: "OK!",
    });
  });
};

export default { create, list, userByID, read, update, remove, checkPassword };
