import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JpgToPdfService } from './jpg-to-pdf.service';
import { ConvertFileDto } from './convert-file.dto';

@Controller('converters')
export class ConvertersController {
  constructor(private readonly jpgToPdfService: JpgToPdfService) {}

  @Post('jpg-to-pdf')
  @UseInterceptors(FileInterceptor('file'))
  async convertJpgToPdf(
    @UploadedFile() file: Express.Multer.File,
    @Body() convertFileDto: ConvertFileDto,
  ): Promise<string> {
    const outputPath = 'path/to/output.pdf';
    await this.jpgToPdfService.convertJpgToPdf([file.path], outputPath);
    return outputPath;
  }
}
