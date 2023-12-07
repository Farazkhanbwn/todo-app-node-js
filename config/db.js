require("dotenv").config();
const mongoose = require("mongoose");

const connectToMongoDb = async () => {
  await mongoose.connect(process.env.MONGO_DB_URI);
  console.log("Conected to MongoDB");
};

module.exports = {
  connectToMongoDb,
};
