import express from 'express';
import cors from 'cors';
import { Analyzer } from './analyzer';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/check', function (req, res) {
  const analyzer = new Analyzer(req.body.text);

  const result = analyzer.run();
  res.json({ body: result });
});

app.listen(5000, () => console.log('Barracuda is launched on http://localhost:5000'));
