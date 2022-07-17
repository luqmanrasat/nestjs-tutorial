import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SerializedUser } from 'src/users/types/user';
import { LocalAuthGuard } from './utils/local-guard';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Request() req) {
    console.log('inside auth controller');
    return new SerializedUser(req.user);
  }

  @Get()
  getAuthSession(@Session() session) {
    console.log('inside auth controller');
    session.authenticated = true;
    return session;
  }
}
