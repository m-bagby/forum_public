import mongoose, {Schema} from "mongoose";


const commentSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dates: {
    created: {
      type: Date,
      default: Date.now(),
    },
    edited: {
      type: Date,
    }
  }
});


//Before save, set edit dates
commentSchema.pre("save", function (next) {
  const comment = this;

  //set edited date if it is not new
  if (comment.__v > 0) {
    comment.dates.edited = Date.now();
  }

  //increment version
  comment.__v++;

  next();
});


export default mongoose.model("Comment", commentSchema);