import express from 'express';
import cors from 'cors';
import { Analyzer } from './analyzer';
import { badWords, removeFromStore, updateStore } from './bad';
import { Rate } from './model';

const app = express();
app.use(cors());
app.use(express.json());

/** An API point analyzing the text. */
app.post('/check', (req, res) => {
  const analyzer = new Analyzer(req.body.text);

  const dictionarySize = badWords.size;
  const result = analyzer.run();
  const actualDictionarySize = badWords.size;
  const difference = actualDictionarySize - dictionarySize;

  const response = {
    body: result,
    learnedWords: difference || 0,
  };

  res.json(response);
});

/** An API point for saving bad word. */
app.post('/addBadWord', (req, res) => {
  const { badWord } = req.body;
  if (updateStore(badWord)) {
    res.status(200);
    res.send();
  } else {
    res.status(400);
    res.send();
  }
});

/** An API point for removing bad word. */
app.post('/removeBadWord', (req, res) => {
  const { badWord } = req.body;
  if (removeFromStore(badWord)) {
    res.status(200);
    res.send();
  } else {
    res.status(404);
    res.send();
  }
});

/** An API point analyzing rates. */
app.post('/rate', (req, res) => {
  const { rate } = req.body;
  const rateObject = Rate.copy(rate);
  res.json({ body: rateObject.analyzeRate() });
});

/** An API point getting current size of the library. */
app.get('/getDictionarySize', (req, res) => {
  res.json({ dictionarySize: badWords.size });
});

app.listen(5000,
  () => console.log('Barracuda BE is launched on http://localhost:5000'));
