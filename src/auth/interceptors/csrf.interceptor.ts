import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { HttpMethodType, HttpMutationMethods } from 'src/app.type';
import { ConfigService } from 'src/config/config.service';
import { AuthService } from '../auth.service';

@Injectable()
export class CsrfInterceptor implements NestInterceptor {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const response = context.switchToHttp().getResponse<FastifyReply>();

    if (!HttpMutationMethods.includes(request.method as HttpMethodType)) {
      response.setCookie(
        this.configService.config.csrf.cookieKey,
        this.authService.generateCsrf(),
        {
          signed: true,
          httpOnly: false,
        },
      );
    }

    return next.handle();
  }
}
