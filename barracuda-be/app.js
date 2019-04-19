import express from 'express';
import cors from 'cors';
import { Analyzer, splitText } from './analyzer';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/check', function (req, res) {
  const arr = splitText(req.body.text);
  const analyzer = new Analyzer(arr);

  const result = analyzer.run();
  res.json({ body: result });
});

app.listen(5000, () => console.log('Barracuda is launched on http://localhost:5000'));
