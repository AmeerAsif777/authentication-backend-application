import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  profile_pic: { type: String, default: "https://icon-library.com/images/male-icon/male-icon-29.jpg"},
});

export default mongoose.model("User", userSchema);