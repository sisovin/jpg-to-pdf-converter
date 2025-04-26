import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

interface ImageData {
  filename: string;
  data: Buffer;
}

class PDFConverter {
  async convertImagesToPDF(images: ImageData[], outputFilePath: string): Promise<void> {
    const pdfDoc = await PDFDocument.create();
    
    for (const image of images) {
      const imageBuffer = image.data;
      const imageType = path.extname(image.filename).toLowerCase();
      let pdfImage;

      if (imageType === '.jpg' || imageType === '.jpeg') {
        pdfImage = await pdfDoc.embedJpg(imageBuffer);
      } else if (imageType === '.png') {
        pdfImage = await pdfDoc.embedPng(imageBuffer);
      } else {
        throw new Error(`Unsupported image format: ${imageType}`);
      }

      const page = pdfDoc.addPage([pdfImage.width, pdfImage.height]);
      page.drawImage(pdfImage, {
        x: 0,
        y: 0,
        width: pdfImage.width,
        height: pdfImage.height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputFilePath, pdfBytes);
  }
}

export default PDFConverter;
