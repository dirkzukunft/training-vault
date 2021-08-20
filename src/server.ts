import express from 'express';
import {
  addOrUpdateCredential,
  getAllCredentials,
  getCredential,
  deleteCredential,
} from './credentials';
import { Credential } from './types';
import { getAndCheckMasterPassword } from './utils/auth';
import { connectDb } from './credentials';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.EXPRESS_PORT || 3001;
const app = express();
app.use(express.json());

app.get('/api/credentials/:service', async (req, res) => {
  const { service } = req.params;
  const masterPassword = await getAndCheckMasterPassword(req, res);
  if (!masterPassword) return;

  try {
    const credential = await getCredential(service, masterPassword);
    res.status(200).json(credential);
  } catch (error) {
    res.status(404).send(`Credentials for ${service} not found`);
    console.error(error);
  }
});

app.get('/api/credentials/', async (req, res) => {
  const masterPassword = await getAndCheckMasterPassword(req, res);
  if (!masterPassword) return;

  try {
    const credentials = await getAllCredentials(masterPassword);
    res.status(200).json(credentials);
  } catch (error) {
    res.status(500).send('No credentials found');
    console.error(error);
  }
});

app.post('/api/credentials/', async (req, res) => {
  const masterPassword = await getAndCheckMasterPassword(req, res);
  if (!masterPassword) return;

  try {
    const credential: Credential = req.body;
    await addOrUpdateCredential(credential, masterPassword);
    res.status(200).json(credential);
  } catch (error) {
    res.status(500).send('Could not add credentials');
    console.error(error);
  }
});

app.delete('/api/credentials/:service', async (req, res) => {
  const { service } = req.params;
  const masterPassword = await getAndCheckMasterPassword(req, res);
  if (!masterPassword) return;

  try {
    await deleteCredential(service);
    res.status(200).send('');
  } catch (error) {
    res.status(500).send(`Could not delete credential ${service}`);
    console.error(error);
  }
});

app.put('/api/credentials/:service', async (req, res) => {
  const masterPassword = await getAndCheckMasterPassword(req, res);
  if (!masterPassword) return;

  const { service } = req.params;
  const credential: Credential = req.body;
  try {
    await addOrUpdateCredential(credential, masterPassword);
    res.status(200).json(credential);
  } catch (error) {
    res.status(500).send(`Could not update credential ${service}`);
    console.error(error);
  }
});

app.get('/api/', async (req, res) => {
  const masterPassword = await getAndCheckMasterPassword(req, res);
  if (masterPassword) res.status(202).send('');
});

connectDb().then(
  () => {
    app.listen(port, async () => {
      console.log(
        `Connected to database and listening at http://localhost:${port}`
      );
    });
  },
  (error) => console.error(error)
);
