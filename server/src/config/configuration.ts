import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

export default () => {
  const envFilePath = path.resolve(__dirname, '../../.env');
  const envConfig = dotenv.parse(fs.readFileSync(envFilePath));

  return {
    port: parseInt(envConfig.PORT, 10) || 3000,
    database: {
      host: envConfig.DB_HOST,
      port: parseInt(envConfig.DB_PORT, 10) || 5432,
      username: envConfig.DB_USERNAME,
      password: envConfig.DB_PASSWORD,
      name: envConfig.DB_DATABASE,
    },
    jwt: {
      secret: envConfig.JWT_SECRET,
      expiresIn: envConfig.JWT_EXPIRES_IN,
    },
    google: {
      clientId: envConfig.GOOGLE_CLIENT_ID,
      clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
      callbackUrl: envConfig.GOOGLE_CALLBACK_URL,
    },
    microsoft: {
      clientId: envConfig.MICROSOFT_CLIENT_ID,
      clientSecret: envConfig.MICROSOFT_CLIENT_SECRET,
      callbackUrl: envConfig.MICROSOFT_CALLBACK_URL,
    },
  };
};
