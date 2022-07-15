import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
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

    if (!user) {
      throw new NotFoundException(`User #${username} not found!`);
    }

    return new SerializedUser(user);
  }
}
