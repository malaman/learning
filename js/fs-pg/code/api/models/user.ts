import * as mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({    
    name: String,
    email: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

// UserSchema.statics.load = function (_id) {
//     return this.findOne({ _id }).exec();
// }

export const User = mongoose.model('User', UserSchema);
