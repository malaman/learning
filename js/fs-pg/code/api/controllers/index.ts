import * as express from 'express';
import {users} from './users';

const router = express.Router();

router.use('/users', users)

router.get('*', function(req, res) {
  res.json({info: 'empty'})
})

export var controllers = router;
