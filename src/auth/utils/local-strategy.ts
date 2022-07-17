import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    console.log('inside local-strategy');
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Please check your login credentials');
    }

    return user;
  }
}
