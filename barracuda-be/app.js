import express from 'express';
import cors from 'cors';
import { Analyzer } from './analyzer';
import { badWords } from './bad';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/check', (req, res) => {
  const analyzer = new Analyzer(req.body.text);

  const result = analyzer.run();
  res.json({ body: result });
});

app.post('/addBadWord', (req, res) => {
  const badWord = req.body.badWord;
  if (typeof badWord === 'string' && badWord.length > 1) {
    badWords.add(badWord);
    res.status(200);
    res.send('The word is added');
  }
  else {
    res.status(400);
    res.send('Bad request');
  }
});

app.get('/getDictionarySize', (req, res) => {
  res.json({ dictionarySize: badWords.size });
});

app.listen(5000, () => console.log('Barracuda is launched on http://localhost:5000'));
