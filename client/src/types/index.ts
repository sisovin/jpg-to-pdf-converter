export interface File {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export interface UploadProgress {
  file: File;
  progress: number;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface ConvertResponse {
  outputPath: string;
  message: string;
}
