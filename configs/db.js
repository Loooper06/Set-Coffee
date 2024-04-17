const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    } else {
      await mongoose.connect(process.env.MONGO_DB_URI);
      console.log("Connected to DB");
    }
  } catch (err) {
    console.log("Db connection Error -> ", err);
  }
};

export default connectDb;
