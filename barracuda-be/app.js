import express from 'express';
import cors from 'cors';
import { Analyzer, isBadWordExist } from './analyzer';
import { badWords } from './bad';

// TODO: Add more reg exps.
// TODO: Move the bad word library to json file. read/write.
// TODO: Add logic for cover rating buttons.
// TODO: Fill the info page.

const app = express();
app.use(cors());
app.use(express.json());

/** An API point analyzing the text. */
app.post('/check', (req, res) => {
  const analyzer = new Analyzer(req.body.text);

  const result = analyzer.run();
  res.json({ body: result });
});

/** An API point for saving bad word. */
app.post('/addBadWord', (req, res) => {
  const badWord = req.body.badWord;
  if (!isBadWordExist(badWord)) {
    badWords.add(badWord.toLowerCase());
    res.status(200);
    res.send();
  }
  else {
    res.status(400);
    res.send();
  }
});

/** An API point for removing bad word. */
app.post('/removeBadWord', (req, res) => {
  const badWord = req.body.badWord;
  if (isBadWordExist(badWord)) {
    badWords.delete(badWord);
    res.status(200);
    res.send();
  }
  else {
    res.status(404);
    res.send();
  }
});

/** An API point getting current size of the library. */
app.get('/getDictionarySize', (req, res) => {
  res.json({ dictionarySize: badWords.size });
});

app.listen(5000, () => console.log('Barracuda is launched on http://localhost:5000'));
