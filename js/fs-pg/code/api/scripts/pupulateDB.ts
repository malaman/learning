import * as mongoose from 'mongoose';
import {User} from '../models/user';
import {Post} from '../models/post';
import {Comment} from '../models/comment';
import * as Rx from '@reactivex/rxjs';

const users = require('../fixtures/users.json');
const posts = require('../fixtures/posts.json');
const comments = require('../fixtures/comments.json');
let i = 0;
const last = comments.length;

const conn = mongoose.connect('mongodb://db:27017/test');
// drop db collections if any
try {
    // conn.connection.collections['users'].drop();
    // conn.connection.collections['posts'].drop();
    // conn.connection.collections['comments'].drop();
} catch (e) {
    console.log(`Error dropping tables: ${e}`);
}

// create user collection
const userPromises = users.map(user => {const {id, username, name, email} = user;
        const newUser = new User({id, username, name, email});
        return newUser.save();
});

const userSource = Rx.Observable.forkJoin(userPromises);
const userSubscription = userSource.subscribe(
    () => null,
    (err) => console.log(`Err: ${err}`),
    () => {
        console.log('Users are saved!');
        const postPromises = posts.map(post => {
            const {userId, title, body} = post;
            return User.findOne({id: userId})
                .then(user => {
                    const newPost = new Post({title, body, _creator: user._id});
                    return newPost.save();
                })
                .then(newPost => {
                    const postCommentsIndex = i + 10;
                    for (i; i < postCommentsIndex && i < last; i++) {
                        const {body, email} = comments[i];
                        let newComment = new Comment({_post: newPost._id, body, email});
                        return newComment.save();
                    }
                });
            });
            let counter = 0;
            Rx.Observable
                .forkJoin(postPromises)
                .subscribe(
                () => null,
                (err) => console.log(`Err: ${err}`),
                () => {
                    console.log('DB population is completed!');
                    process.exit();
                }
            );
    }
);
