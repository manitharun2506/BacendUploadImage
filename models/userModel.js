import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phoneNo: Number,
  gallery: [],
  password: String,
});

const USER = mongoose.model("user", userSchema);

export default USER;
