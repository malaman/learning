import * as express from 'express';
import * as mongoose from 'mongoose';
import {User} from '../models/user';
import {Post} from '../models/post';

const router = express.Router();

router.get('/', function(req, res) {
    let response = [];
    User.find({}, (err, users) => {
        if (err) {
            return res.json(response);;
        }
        res.json(users);
    });
});


// curl --data "name=Elvis&email=elvis@example.com" http://localhost:3030/api/users
router.post('/', function(req, res) {
    const {name, email} = req.body;
    if (name && email) {
        const user = new User({name, email});
        user.save((err) => {
            if (err) {
                return res.json({error: `user saving error: ${err}`});
            }
            res.json({_id: user._id});
        })
    } else {
        res.json({error: 'user saving error'});
    }
});

router.get('/:id', function(req, res) {
    let response = {};
    User.findOne({_id: req.params.id}, (err, user) => {
        if (err) {
            return res.json(response);;
        }
        res.json(user);
    });
});

export var users = router;
