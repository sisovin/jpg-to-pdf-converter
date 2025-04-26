import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class FileCleanupScheduler {
  private readonly logger = new Logger(FileCleanupScheduler.name);
  private readonly tempFilePath = 'path/to/temp/files';

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.debug('Running file cleanup task');
    try {
      const files = await fs.readdir(this.tempFilePath);
      const now = Date.now();

      for (const file of files) {
        const filePath = join(this.tempFilePath, file);
        const stats = await fs.stat(filePath);
        const fileAge = now - stats.mtimeMs;

        if (fileAge > 24 * 60 * 60 * 1000) { // 1 day in milliseconds
          await fs.unlink(filePath);
          this.logger.debug(`Deleted file: ${file}`);
        }
      }
    } catch (error) {
      this.logger.error('Error during file cleanup', error);
    }
  }
}
