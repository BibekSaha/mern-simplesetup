import path from 'path';
import express from 'express';
import { MongoClient } from 'mongodb';
import devBundle from './devBundle'; // FOR DEVELOPMENT PURPOSES ONLY!
import template from '../template';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mernSimpleSetup';
const app = express();

devBundle.compile(app); // FOR DEVELOPMENT PURPOSES ONLY!

const CURRENT_WORKING_DIR = process.cwd();
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

app.get('/', (req, res, next) => {
  res.status(200).send(template());
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err)
    console.log(error);
  console.info('Server started at port %s', PORT);
  MongoClient.connect(MONGO_URI, (err, db) => {
    console.log('Database connected...');
    db.close();
  });
})
