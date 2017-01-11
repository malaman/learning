import * as express from 'express';
import * as mongoose from 'mongoose';
import {User} from '../models/user';
import {Post} from '../models/post';
import {Comment} from '../models/comment';

const router = express.Router();

router.get('/', function(req, res) {
    let response = [];
    User.find({}, (err, users) => {
        if (err) {
            return res.json(response);
        }
        res.json(users);
    });
});


router.post('/', function(req, res) {
    const {name, email} = req.body;
    if (name && email) {
        const user = new User({name, email});
        user.save((err) => {
            if (err) {
                return res.json({error: `user saving error: ${err}`});
            }
            res.json({_id: user._id});
        });
    } else {
        res.json({error: 'user saving error'});
    }
});

router.get('/:username', function(req, res) {
    let response = {};
    User.findOne({username: req.params.username}, (err, user) => {
        if (err) {
            return res.json(response);
        }
        res.json(user);
    });
});

router.get('/:id/posts', function(req, res) {
    let response = [];
    Post
    .find({_creator: req.params.id})
    .exec((err, posts) => {
        if (err) {
            return res.json(response);
        }
        return res.json(posts);
    });
});

export var users = router;
