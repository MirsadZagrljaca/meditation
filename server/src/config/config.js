require("dotenv").config();

// mongodb+srv://admin:<password>@cluster0.wilyr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "MifaParagon",
  mongoUser:process.env.MONGO_USER || "Paragon004",
  mongoPass:process.env.MONGO_PASS || "!400nogaraP$",
  database:process.env.PROJECT_NUMBER || "thirthySix",
  mongoCluster:process.env.MONGO_CLUSTER || "@cluster0.wilyr.mongodb.net"
};

export default config;
