import express from 'express';
import { getCredential, readCredentials } from './credentials';
const app = express();
const port = 3000;

app.get('/api/credentials/:service', async (req, res) => {
  const { service } = req.params;
  try {
    const credential = await getCredential(service);
    res.status(200).json(credential);
  } catch (error) {
    res.status(404).send(`Credentials for ${service} not found`);
    console.log(error);
  }
});

app.get('/api/credentials/', async (_req, res) => {
  try {
    const credentials = await readCredentials();
    res.status(200).json(credentials);
  } catch (error) {
    res.status(500).send('No credentials found');
    console.log(error);
  }
});

app.get('/', (_req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
