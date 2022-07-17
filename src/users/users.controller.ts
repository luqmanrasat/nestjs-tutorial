import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/local-guard';
import { CreateUserDto } from './dto/create-user.dto';
import { SerializedUser } from './types/user';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  async getUsers() {
    const users = await this.usersService.getUsers();
    return users.map((user) => new SerializedUser(user));
  }

  @Get('/username/:username')
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.usersService.getUserByUsername(username);

    if (!user) {
      throw new NotFoundException(`User #${username} not found!`);
    }

    return new SerializedUser(user);
  }

  @Get('/id/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found!`);
    }

    return new SerializedUser(user);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
