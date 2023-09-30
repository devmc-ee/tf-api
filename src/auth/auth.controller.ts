import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CheckIdTokenDto } from './dtos/check-id-token.dto';
import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { ERROR_CODE } from 'src/app.type';
import { HttpStatusCode } from 'axios';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
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

  @Post('refresh-token')
  async refreshToken(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    req.log.info(req.cookies, 'REFRESH TOKEN');

    if (!req.cookies['refresh-token']) {
      throw new HttpException('Invalid refresh token', HttpStatus.BAD_REQUEST);
    }

    const refreshToken = req.cookies['refresh-token'];
    try {
      const { data } = await this.authService.refreshToken(refreshToken);

      return res.code(HttpStatus.CREATED).send(data);
    } catch (error) {
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }
}
