import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AxiosError } from 'axios';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as FastifyRequest;
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token');
    }

    try {
      await this.authService.verifyToken(token);

      return true;
    } catch (error) {
      request.log.error(
        (error as AxiosError).response,
        'access token verification failed',
      );

      throw new UnauthorizedException((error as AxiosError).response.data);
    }
  }

  private extractTokenFromHeader(request: FastifyRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
