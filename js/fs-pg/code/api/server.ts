import * as http from 'http';
import * as mongoose from 'mongoose';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {controllers} from './controllers/index';
import * as cors from 'cors';

//models
import {User} from './models/user';
import {Post} from './models/post';
const port = 3030;

var app = express();

app.use(cors());
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', controllers);

app.listen(port, '0.0.0.0', function() {
  console.log('Listening on port ' + port);
});

mongoose.connect('mongodb://db:27017/test');
