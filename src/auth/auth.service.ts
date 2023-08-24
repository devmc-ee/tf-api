import { Injectable } from '@nestjs/common';
import { GoogleAuthService } from './google-auth/google-auth.service';
import Tokens, { TokensSimple } from '@fastify/csrf';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthService {
  private csrfSecret: { [token: string]: string } = {};
  private readonly csrfService: TokensSimple;

  constructor(private readonly googleAuthService: GoogleAuthService) {
    this.csrfService = new Tokens({});
  }

  async auth(token: string, ctx: FastifyRequest) {
    const payload = await this.googleAuthService.verify(token, ctx);

    // has email

    // get access token
    
  }

  generateCsrf(): string {
    // TDOD: move to auth micro service
    const secret = this.csrfService.secretSync();
    const token = this.csrfService.create(secret);

    this.csrfSecret[token] = secret;

    return token;
  }

  verifyCsrfToken(token: string): boolean {
    return this.csrfService.verify(this.csrfSecret[token], token);
  }
}
