import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class LocalFileStorageService {
  private readonly storagePath = 'path/to/local/storage';

  async saveFile(fileName: string, fileContent: Buffer): Promise<void> {
    const filePath = join(this.storagePath, fileName);
    await fs.writeFile(filePath, fileContent);
  }

  async getFile(fileName: string): Promise<Buffer> {
    const filePath = join(this.storagePath, fileName);
    return fs.readFile(filePath);
  }

  async deleteFile(fileName: string): Promise<void> {
    const filePath = join(this.storagePath, fileName);
    await fs.unlink(filePath);
  }
}
