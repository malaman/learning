import * as http from 'http';
import * as mongoose from 'mongoose';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {controllers} from './controllers/index';
const port = 3030;

var app = express();

app.use('/api', controllers);

app.listen(port, '0.0.0.0', function() {
  console.log('Listening on port ' + port)
});



mongoose.connect('mongodb://172.18.0.2:27017/test');

const CatSchema = new mongoose.Schema({
  name: {type:String, required: true},
});

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

var postSchema = new mongoose.Schema({
    _creator: { type: Number, ref: 'User' },
    title: String,
    body: String
});


var Cat = mongoose.model('Cat', CatSchema);
var User = mongoose.model('User', userSchema);
var Post = mongoose.model('Post', postSchema);

var newUser = new User({
    name: 'Andrii',
    email: 'none@none.com'
});

// newUser.save((err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('newUser: ', newUser);
//     }
// });


// var kitty = new Cat({ name: 'Zildjian' });
// kitty.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');
//   }
// });
