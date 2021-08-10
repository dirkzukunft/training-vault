import express from 'express';
import { getCredential } from './credentials';
const app = express();
const port = 3000;

app.get('/api/credentials/:service', async (req, res) => {
  const credential = await getCredential(req.params.service);

  // if (credential) {
  res.status(200).json(credential);
  // } else {
  //   res.status(404).send();
  // }
});

app.get('/', (_req, res) => {
  res.send('');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
