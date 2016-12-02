import * as mongoose from 'mongoose';
const AutoIncrement = require('mongoose-sequence');

const UserSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String
});

UserSchema.plugin(AutoIncrement, {inc_field: 'id', disable_hooks: true});

export const User = mongoose.model('User', UserSchema);
