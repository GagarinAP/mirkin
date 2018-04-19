import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import BrainJSClassifier from 'natural-brain'

const classifier = new BrainJSClassifier();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

classifier.addDocument('my unit-tests failed.', 'software');
classifier.addDocument('tried the program, but it was buggy.', 'software');
classifier.addDocument('tomorrow we will do standup.', 'meeting');
classifier.addDocument('the drive has a 2TB capacity.', 'hardware');
classifier.addDocument('i need a new power supply.', 'hardware');
classifier.addDocument('can you play some new music?', 'music');

classifier.train();

app.post('/send', (req, res) => res.send({res: classifier.classify(req.body.str)}) );

app.listen(port);

export default app;