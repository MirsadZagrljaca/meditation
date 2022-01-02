import User from "../models/user.model";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import config from "../config/config";
import cache from "../../../cache/cache";

const signin = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err || !user) {
      return res.json({ error: "User not found" });
    }

    if (!user.authenticate(req.body.password)) {
      return res.json({ error: "Email and password don't match" });
    }

    cache._id = user._id;
    cache.email = user.email;
    cache.username = user.username;
    cache.favorites = user.favorites;
    cache.progress = user.progress;
    cache.longestStreak = user.longestStreak;
    cache.totalSessions = user.totalSessions;
    cache.mindfulMinutes = user.mindfulMinutes;
    cache.longest = user.longest;

    const token = jwt.sign({ _id: user._id }, config.jwtSecret);

    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.status(200).json({
      token,
    });
  });
};

const signout = (req, res) => {
  res.clearCookie("t");

  cache._id = "";
  cache.username = "";
  cache.email = "";
  cache.favorites = [];
  cache.progress = "";
  cache.longestStreak = [];
  cache.totalSessions = 0;
  cache.mindfulMinutes = "";
  cache.longest = 0;

  return res.status(200).json({ message: "signed out" });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  userProperty: "auth",
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!authorized) {
    return res.status(403).json({ error: "User is not authorized" });
  }

  next();
};

export default { signin, signout, requireSignin, hasAuthorization };
