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
import { HttpService } from '@nestjs/axios';
import { ConfigService } from 'src/config/config.service';
import { HttpStatusCode } from 'axios';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  @Post()
  @UseGuards(CsrfGuard)
  async checkIdToken(
    @Body() checkIdTokeDto: CheckIdTokenDto,
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
  ) {
    req.log.info(checkIdTokeDto);

    try {
      const { data } = await this.authService.authUserWithGoogle(
        checkIdTokeDto.idToken,
      );

      const { user, accessToken, refreshToken, refreshTokenExpiresAt } = data;

      res.setCookie('refresh-token', refreshToken, {
        httpOnly: true,
        expires: new Date(refreshTokenExpiresAt),
      });

      return res.code(HttpStatus.CREATED).send({ user, accessToken });
    } catch (error) {
      req.log.error(error, 'Google login failed with error');

      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case HttpStatusCode.BadRequest: {
            throw new HttpException(
              `Invalid idToken, ${ERROR_CODE.INVALID_GOOGLE_ID_TOKEN}`,
              HttpStatus.BAD_REQUEST,
            );
          }
          default: {
            throw new HttpException(`Login failed: ${data.message}`, status);
          }
        }
      }

      throw new HttpException(
        `Something went wrong`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Head()
  async getCsrf(@Res({ passthrough: true }) res: FastifyReply) {
    res.log.info({ res: res.cookies });
  }
}
