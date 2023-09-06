import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { ERROR_CODE, HttpMethodType, HttpMutationMethods } from 'src/app.type';
import { ConfigService } from 'src/config/config.service';
import { AuthService } from '../auth.service';

@Injectable()
export class CsrfGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    if (!HttpMutationMethods.includes(request.method as HttpMethodType)) {
      return true;
    }

    const { headers } = request;

    const token = headers[
      this.configService.config.csrf.responseHeader.toLocaleLowerCase()
    ] as string;

    const isValid =
      token &&
      this.authService.verifyCsrfToken(request.unsignCookie(token).value);

    if (!isValid) {
      request.log.error(
        { errorCode: ERROR_CODE.CSRF_CHECK_FAILED, token },
        'ERROR_CODE.CSRF_CHECK_FAILED',
      );

      throw new HttpException(
        `Forbidden, ${ERROR_CODE.CSRF_CHECK_FAILED}`,
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
}
