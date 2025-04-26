import { Injectable } from '@nestjs/common';

export interface CloudStorage {
  uploadFile(fileName: string, fileContent: Buffer): Promise<string>;
  downloadFile(fileName: string): Promise<Buffer>;
  deleteFile(fileName: string): Promise<void>;
}
