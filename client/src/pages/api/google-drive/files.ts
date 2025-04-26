import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const drive = google.drive({ version: 'v3', auth: oauth2Client });
      const response = await drive.files.list();
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve files from Google Drive' });
    }
  } else if (req.method === 'POST') {
    const { name, mimeType, parents } = req.body;

    try {
      const drive = google.drive({ version: 'v3', auth: oauth2Client });
      const fileMetadata = {
        name,
        parents,
      };
      const media = {
        mimeType,
        body: req.body.file,
      };
      const response = await drive.files.create({
        requestBody: fileMetadata,
        media,
        fields: 'id',
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload file to Google Drive' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
