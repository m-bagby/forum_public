import mongoose, {Schema} from "mongoose";


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  image: {
    type: String,
    trim: true,
  }
});


//If no custom image, set user image to default profile picture
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.image) {
    user.image = "/images/defaultProfilePicture.svg";
  }

  next();
});


export default mongoose.model("User", userSchema);