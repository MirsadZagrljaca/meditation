require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "MifaParagon",
  mongoUrl:
    process.env.MONGODB_URL ||
    "mongodb+srv://admin:sV8VZrGm5OdJKLiC@cluster0.wilyr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};

export default config;
