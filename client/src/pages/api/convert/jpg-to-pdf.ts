import { NextApiRequest, NextApiResponse } from 'next';
import { PDFDocument } from 'pdf-lib';
import { promises as fs } from 'fs';
import { join } from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { filePaths } = req.body;

  if (!filePaths || !Array.isArray(filePaths) || filePaths.length === 0) {
    return res.status(400).json({ message: 'Invalid file paths' });
  }

  try {
    const pdfDoc = await PDFDocument.create();

    for (const filePath of filePaths) {
      const jpgImageBytes = await fs.readFile(filePath);
      const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
      const page = pdfDoc.addPage([jpgImage.width, jpgImage.height]);
      page.drawImage(jpgImage, {
        x: 0,
        y: 0,
        width: jpgImage.width,
        height: jpgImage.height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    const outputPath = join(process.cwd(), 'public', 'downloads', 'output.pdf');
    await fs.writeFile(outputPath, pdfBytes);

    return res.status(200).json({ message: 'PDF created successfully', outputPath });
  } catch (error) {
    console.error('Error converting JPG to PDF:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
