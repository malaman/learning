import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import {User} from '../models/user';
import {Post} from '../models/post';
import {Comment} from '../models/comment';

const users = require('../fixtures/users.json');
const posts = require('../fixtures/posts.json');
const comments = require('../fixtures/comments.json');
let i = 0;
const last = comments.length;

const conn = mongoose.connect('mongodb://172.18.0.2:27017/test');
// drop db collections if any
try {
    conn.connection.collections['users'].drop();
    conn.connection.collections['posts'].drop();
    conn.connection.collections['comments'].drop();
} catch (e) {}

// create user collection
const userPromises = users
    .map(user => {
        const {id, username, name, email} = user;
        const newUser = new User({id, username, name, email});
        return newUser.save();
    });

// create posts collection and comments collection after user collection is created
Promise.all(userPromises).then(() => {
    const commentPromises = posts.map(post => {
        const {userId, title, body} = post;
        return User.findOne({id: userId})
            .then(user => {
                const newPost = new Post({title, body, _creator: user._id});
                return newPost.save().then(() => {
                    const postCommentsIndex = i + 10;
                    for (i; i < postCommentsIndex && i < last; i++) {
                        const {body, email} = comments[i];
                        let newComment = new Comment({_post: newPost._id, body, email});
                        return newComment.save();
                    }
                });
            });
    });
    // exit from script after all tasks is completed
    Promise.all(commentPromises).then(() => {
        console.log('length', commentPromises.length);
        console.log('DB population is completed!');
        process.exit();
    });
});
