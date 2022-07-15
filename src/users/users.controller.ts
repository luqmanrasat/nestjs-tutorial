import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { SerializedUser } from './types/user';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers().map((user) => new SerializedUser(user));
  }

  @Get(':username')
  getUser(@Param('username') username: string) {
    const user = this.usersService.getUser(username);
    return new SerializedUser(user);
  }
}
