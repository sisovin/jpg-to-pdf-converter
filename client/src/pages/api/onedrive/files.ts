import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@microsoft/microsoft-graph-client';
import { getToken } from './auth';

const getAuthenticatedClient = (accessToken: string) => {
  const client = Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
  return client;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { token } = req.query;

    try {
      const accessToken = await getToken(token as string);
      const client = getAuthenticatedClient(accessToken);

      const driveItems = await client.api('/me/drive/root/children').get();

      res.status(200).json(driveItems);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch files from OneDrive' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
