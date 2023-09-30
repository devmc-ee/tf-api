import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from 'src/config/config.service';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AuthService {
  public AUTH_WITH_GOOGLE_URL = '';
  public TOKEN_VERIFY_URL = '';
  public TOKEN_REFRESH_URL = '';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.AUTH_WITH_GOOGLE_URL = `${configService.config.authServiceUrl}/v1/auth/google`;
    this.TOKEN_VERIFY_URL = `${configService.config.authServiceUrl}/v1/auth/access-token`;
    this.TOKEN_REFRESH_URL = `${configService.config.authServiceUrl}/v1/auth/refresh-access-token`;
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

  async refreshToken(
    token: string,
  ): Promise<AxiosResponse<{ accessToken: string }>> {
    return firstValueFrom(
      this.httpService.post(
        this.TOKEN_REFRESH_URL,
        {
          refreshToken: token,
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
