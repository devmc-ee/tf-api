import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Auth, google } from 'googleapis';
import { ERROR_CODE } from 'src/app.type';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class GoogleAuthService {
  private authClient: Auth.OAuth2Client;

  constructor(private readonly configService: ConfigService) {
    const clientId = this.configService.config.googleClientId;
    const clientSecret = this.configService.config.googleSecretId;

    this.authClient = new google.auth.OAuth2(clientId, clientSecret);
  }

  async auth(token: string, ctx: FastifyRequest) {
    const payload = await this.verify(token, ctx);

    return payload;
  }

  async verify(token: string, ctx: FastifyRequest): Promise<Auth.TokenPayload> {
    const loginTicket = await this.authClient.verifyIdToken({
      idToken: token,
      audience: this.configService.config.googleClientId,
    });

    const payload = loginTicket.getPayload();
    ctx.log.info(payload);

    if (!payload.email_verified) {
      ctx.log.error(
        { errorCode: ERROR_CODE.GOOGLE_UNVERIFIED_EMAIL },
        'ERROR_CODE.GOOGLE_UNVERIFIED_EMAIL',
      );

      throw new HttpException(
        `Unverified email, ${ERROR_CODE.GOOGLE_UNVERIFIED_EMAIL}`,
        HttpStatus.FORBIDDEN,
      );
    }

    return payload;
  }
}
