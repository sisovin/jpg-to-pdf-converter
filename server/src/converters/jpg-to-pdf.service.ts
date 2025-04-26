import { Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class JpgToPdfService {
  async convertJpgToPdf(jpgPaths: string[], outputPath: string): Promise<void> {
    const pdfDoc = await PDFDocument.create();

    for (const jpgPath of jpgPaths) {
      const jpgImageBytes = await fs.readFile(jpgPath);
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
    await fs.writeFile(outputPath, pdfBytes);
  }
}
