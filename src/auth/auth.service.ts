import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from 'src/config/config.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  public AUTH_WITH_GOOGLE_URL = '';
  public TOKEN_VERIFY_URL = '';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.AUTH_WITH_GOOGLE_URL = `${configService.config.authServiceUrl}/v1/auth/google`;
    this.TOKEN_VERIFY_URL = `${configService.config.authServiceUrl}/v1/auth/access-token`;
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

  async verifyToken(token: string) {
    return firstValueFrom(
      this.httpService.post(
        this.TOKEN_VERIFY_URL,
        {
          accessToken: token,
        },
        {
          headers: {
            'service-token': `Bearer ${this.configService.config.serviceToken}`,
          },
        },
      ),
    );
  }
}
