import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class GoogleOauthGuard implements CanActivate {
  constructor(private configeService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log('headers1', request.headers);
    return true;
  }
}
