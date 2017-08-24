import * as express from 'express';
import * as mongoose from 'mongoose';
import {Post} from '../models/post';
import {User} from '../models/user';
import {Comment} from '../models/comment';

const router = express.Router();

router.get('/', function (req, res) {
  let response = [];
  Post.find({}, (err, posts) => {
    if (err) {
      return res.json(response);
    }
    res.json(posts);
  });
});

router.post('/', function (req, res) {
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

router.get('/:id', function (req, res) {
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

router.get('/:id/comments', function (req, res) {
  let response = [];
  Comment
    .find({_post: req.params.id})
    .exec((err, comments) => {
      if (err) {
        return res.json(response);
      }
      return res.json(comments);
    });
});


export var posts = router;
