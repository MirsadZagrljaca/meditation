import config from "./config/config";
import app from "./express";

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }

  console.info("Server started on port", config.port);
});

import mongoose from "mongoose";

// mongodb+srv://admin:<password>@cluster0.wilyr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const mongoUrl = `mongodb+srv://${config.mongoUser}:${config.mongoPass}${config.mongoCluster}/${config.database}?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully..."))
  .catch(() => console.log(`Error connecting to MongoDB ${mongoUrl}`));
