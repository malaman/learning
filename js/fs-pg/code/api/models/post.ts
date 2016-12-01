import * as mongoose from 'mongoose';

var postSchema = new mongoose.Schema({
    _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    body: String
});

export const Post = mongoose.model('Post', postSchema);
