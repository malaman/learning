import * as express from 'express';
import {users} from './users';
import {posts} from './posts';

const router = express.Router();

router.use('/users', users);
router.use('/posts', posts);

router.get('*', function(req, res) {
  res.json({info: 'empty'})
})

export var controllers = router;
