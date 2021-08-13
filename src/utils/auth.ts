import { validateMasterPassword } from './validation';

export async function getAndCheckMasterPassword(
  req: any,
  res: any
): Promise<string> {
  const masterPassword = req.headers.authorization;
  if (!masterPassword) {
    res.status(400).send('Authorization header missing');
    return '';
  } else if (!(await validateMasterPassword(masterPassword))) {
    res.status(401).send('Unauthorized request');
    return '';
  }
  return masterPassword;
}
