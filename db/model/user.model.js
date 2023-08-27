import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    age: Number,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true
    },
    phone_number: Number,
    iSverified: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true
  });
  
  const User = mongoose.model('User', userSchema);
  
  export default User;