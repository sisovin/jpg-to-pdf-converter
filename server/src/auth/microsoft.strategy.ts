import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy, VerifyCallback } from 'passport-azure-ad';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(BearerStrategy, 'microsoft') {
  constructor(private readonly configService: ConfigService) {
    super({
      identityMetadata: `https://login.microsoftonline.com/${configService.get<string>('AZURE_AD_TENANT_ID')}/v2.0/.well-known/openid-configuration`,
      clientID: configService.get<string>('AZURE_AD_CLIENT_ID'),
      clientSecret: configService.get<string>('AZURE_AD_CLIENT_SECRET'),
      validateIssuer: true,
      passReqToCallback: false,
      loggingLevel: 'info',
      scope: ['profile', 'email'],
    });
  }

  async validate(token: any, done: VerifyCallback): Promise<any> {
    const { oid, name, upn } = token;
    const user = {
      id: oid,
      name,
      email: upn,
    };
    done(null, user);
  }
}
