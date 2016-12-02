import * as mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    body: String
});

export const Post = mongoose.model('Post', postSchema);
