import * as express from 'express';

const router = express.Router();


router.get('/', function(req, res) {
  res.json({users: []});
})

export var users = router;
