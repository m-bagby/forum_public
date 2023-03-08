import mongoose, {Schema} from "mongoose";


const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
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
      default: new Date,
    },
    edited: {
      type: Date,
    }
  },
  commentsCount: {
    type: Number,
    default: 0,
  }
});


//Before save, set date for edits
postSchema.pre("save", function (next) {
  const post = this;

  //set edited date if it is not new
  if (post.__v > 0) {
    post.dates.edited = Date.now();
  }

  //increment version
  post.__v++;

  next();
});


export default mongoose.model("Post", postSchema);