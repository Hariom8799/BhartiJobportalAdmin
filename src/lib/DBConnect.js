import mongoose from "mongoose";


const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "");

    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to the database");
  } catch (err) {
    console.log("errorororroorr",err);
    process.exit(1);
  }
}

export default dbConnect;
