import {
  Body,
  Controller,
  Head,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CheckIdTokenDto } from './dtos/check-id-token.dto';
import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { CsrfGuard } from './guards/csrf.guard';
import { ERROR_CODE } from 'src/app.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  @UseGuards(CsrfGuard)
  async checkIdToken(
    @Body() checkIdTokeDto: CheckIdTokenDto,
    @Req() req: FastifyRequest,
  ) {
    req.log.info(checkIdTokeDto);

    try {
      await this.authService.auth(checkIdTokeDto.idToken, req);
    } catch (error) {
      req.log.error(
        error,
        `Verification failed, ${ERROR_CODE.GOOGLE_VERIFICATION_FAILED}`,
      );

      throw new HttpException(
        `Verification failed, ${ERROR_CODE.GOOGLE_VERIFICATION_FAILED}`,
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Head()
  async getCsrf(@Res({ passthrough: true }) res: FastifyReply) {
    res.log.info({ res: res.cookies });
  }
}
