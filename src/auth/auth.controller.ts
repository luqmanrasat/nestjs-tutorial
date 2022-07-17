import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { SerializedUser } from 'src/users/types/user';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/local-guard';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Req() req) {
    console.log('inside auth controller');
    return new SerializedUser(req.user);
  }

  @Get()
  getAuthSession(@Session() session) {
    console.log('inside auth controller');
    session.authenticated = true;
    return session;
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  getAuthStatus(@Req() req: Request) {
    return new SerializedUser(req.user);
  }
}
