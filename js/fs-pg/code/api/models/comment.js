import * as mongoose from 'mongoose';

var commentSchema = new mongoose.Schema({
  _post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
  email: String,
  body: String
});

export const Comment = mongoose.model('Comment', commentSchema);
