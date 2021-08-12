import express from 'express';
import {
  addCredential,
  deleteCredential,
  getAllCredentials,
  getCredential,
  updateCredential,
} from './credentials';
import { Credential } from './types';
import { validateMasterPassword } from './uitls/validation';
const port = 3000;
const app = express();
app.use(express.json());

app.get('/api/credentials/:service', async (req, res) => {
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterPassword(masterPassword))) {
    res.status(401).send('Unauthorized request');
    return;
  }

  const { service } = req.params;
  try {
    const credential = await getCredential(service, masterPassword);
    res.status(200).json(credential);
  } catch (error) {
    res.status(404).send(`Credentials for ${service} not found`);
    console.error(error);
  }
});

app.get('/api/credentials/', async (req, res) => {
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterPassword(masterPassword))) {
    res.status(401).send('Unauthorized request');
    return;
  }

  try {
    const credentials = await getAllCredentials(masterPassword);
    res.status(200).json(credentials);
  } catch (error) {
    res.status(500).send('No credentials found');
    console.error(error);
  }
});

app.post('/api/credentials/', async (req, res) => {
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterPassword(masterPassword))) {
    res.status(401).send('Unauthorized request');
    return;
  }

  try {
    const credential: Credential = req.body;
    await addCredential(credential, masterPassword);
    res.status(200).json(credential);
  } catch (error) {
    res.status(500).send('Could not add credentials');
    console.error(error);
  }
});

app.delete('/api/credentials/:service', async (req, res) => {
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterPassword(masterPassword))) {
    res.status(401).send('Unauthorized request');
    return;
  }
  const { service } = req.params;
  try {
    await deleteCredential(service);
    res.status(200).send('');
  } catch (error) {
    res.status(500).send(`Could not delete credential ${service}`);
    console.error(error);
  }
});

app.put('/api/credentials/:service', async (req, res) => {
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return;
  } else if (!(await validateMasterPassword(masterPassword))) {
    res.status(401).send('Unauthorized request');
    return;
  }

  const { service } = req.params;
  const credential: Credential = req.body;
  try {
    await updateCredential(service, credential, masterPassword);
    res.status(200).json(credential);
  } catch (error) {
    res.status(500).send(`Could not update credential ${service}`);
    console.error(error);
  }
});

app.get('/', (_req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log();
  validateMasterPassword('mykey');
  console.log(`Listening at http://localhost:${port}`);
});
