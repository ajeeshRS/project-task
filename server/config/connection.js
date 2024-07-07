const mongoose = require("mongoose");

function connectDb(callback) {
  const mongoUri = process.env.MONGO_URI;
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in the environment variables");
  }

  // connection to the uri
  mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => console.log(err));

  const db = mongoose.connection;

  db.once("open", () => {
    console.log("connection succeed");
    callback()
  });

  db.on("error", (err) => {
    console.log("error:", err);
  });
}

module.exports = connectDb;
