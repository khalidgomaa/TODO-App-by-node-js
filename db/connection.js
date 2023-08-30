import mongoose from "mongoose";
const url ="mongodb://127.0.0.1:27017/Todo"
 async function connectToDatabase() {
  try {
    // console.log("try")

    await mongoose.connect(url);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

export default connectToDatabase;