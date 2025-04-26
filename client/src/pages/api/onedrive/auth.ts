import { NextApiRequest, NextApiResponse } from 'next';
import { ConfidentialClientApplication } from '@azure/msal-node';

const msalConfig = {
  auth: {
    clientId: process.env.MICROSOFT_CLIENT_ID,
    authority: `https://login.microsoftonline.com/common`,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  },
};

const cca = new ConfidentialClientApplication(msalConfig);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { token } = req.body;

    try {
      const authResult = await cca.acquireTokenByClientCredential({
        scopes: ['https://graph.microsoft.com/.default'],
        clientAssertion: token,
      });

      res.status(200).json(authResult);
    } catch (error) {
      res.status(500).json({ error: 'Failed to authenticate with Microsoft OneDrive' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
