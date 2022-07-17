import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ){}

  async validateUser(username: string, password: string) {
    console.log('inside auth service');
    const user = await this.usersService.getUserByUsername(username);
    if (!user || !(await compare(password, user.password))) {
      return null;
    }
    return user;
  }
}
