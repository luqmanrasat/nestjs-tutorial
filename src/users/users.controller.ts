import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SerializedUser } from './types/user';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    // return this.usersService.getUsers().map((user) => new SerializedUser(user));
    return this.usersService.getUsers();
  }

  @Get('/username/:username')
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.usersService.getUserByUsername(username);
    // return new SerializedUser(user);
    return user;
  }

  @Get('/id/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUserById(id);
    // return new SerializedUser(user);
    return user;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
