import { Injectable } from '@nestjs/common';
import Tokens, { TokensSimple } from '@fastify/csrf';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from 'src/config/config.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  public AUTH_WITH_GOOGLE_URL = '';

  private csrfSecret: { [token: string]: string } = {};
  private readonly csrfService: TokensSimple;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.csrfService = new Tokens({});
    this.AUTH_WITH_GOOGLE_URL = `${configService.config.authServiceUrl}/v1/auth/google`;
  }

  async authUserWithGoogle(idToken: string) {
    return await firstValueFrom(
      this.httpService.post(
        this.AUTH_WITH_GOOGLE_URL,
        {
          idToken,
        },
        {
          headers: {
            'service-token': `Bearer ${this.configService.config.serviceToken}`,
          },
        },
      ),
    );
  }

  generateCsrf(): string {
    const secret = this.csrfService.secretSync();
    const token = this.csrfService.create(secret);

    this.csrfSecret[token] = secret;

    return token;
  }

  verifyCsrfToken(token: string): boolean {
    return this.csrfService.verify(this.csrfSecret[token], token);
  }
}
