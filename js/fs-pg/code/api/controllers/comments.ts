import * as express from 'express';
import {Comment} from '../models/comment';

const router = express.Router();

router.get('/', function (req, res) {
  let response = [];
  Comment.find({}, (err, comments) => {
    if (err) {
      return res.json(response);
    }
    res.json(comments);
  });
});

// curl --data "_creator=583fe62f2f5dd602555f79e0&title=My new post&body=sdfv -wevsdfnrc 0adfvdfvldc dflvnvke" http://localhost:3030/api/comments
router.post('/', function (req, res) {
  const {_creator, _post, email, body} = req.body;
  if (_creator && _post && email && body) {
    const comment = new Comment({_creator, _post, email, body});
    comment.save((err) => {
      if (err) {
        return res.json({error: `comment saving error: ${err}`});
      }
      res.json({_id: comment._id});
    });
  } else {
    res.json({post: 'comment saving error'});
  }
});

export var comments = router;
