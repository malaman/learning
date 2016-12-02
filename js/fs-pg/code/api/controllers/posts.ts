import * as express from 'express';
import * as mongoose from 'mongoose';
import {Post} from '../models/post';
import {User} from '../models/user';

const router = express.Router();

router.get('/', function(req, res) {
    let response = [];
    Post.find({}, (err, posts) => {
        if (err) {
            return res.json(response);
        }
        res.json(posts);
    });
});


// curl --data "_creator=58413f7f79a81700b2f7123e&title=My new post&body=sdfv -wevsdfnrc 0adfvdfvldc dflvnvke" http://localhost:3030/api/posts
router.post('/', function(req, res) {
    const {_creator, title, body} = req.body;
    console.log('req.body', req.body);
    if (_creator && title && body) {
        const post = new Post({_creator, title, body});
        post.save((err) => {
            if (err) {
                return res.json({error: `post saving error: ${err}`});
            }
            res.json({_id: post._id});
        });
    } else {
        res.json({post: 'post saving error'});
    }
});

router.get('/:id', function(req, res) {
    let response = {};
    Post
    .findOne({_id: req.params.id})
    .populate('_creator')
    .exec((err, user) => {
        if (err) {
            return res.json(response);
        }
        res.json(user);
    });
});

export var posts = router;
