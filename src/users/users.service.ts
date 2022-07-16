import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user';
// import { User } from './types/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // private users: User[] = [
  //   { id: 1, username: 'luqman', password: 'luqman' },
  //   { id: 2, username: 'abu', password: 'abu' },
  //   { id: 3, username: 'ali', password: 'ali' },
  // ];

  getUsers() {
    return this.usersRepository.find();
  }

  async getUserByUsername(username: string) {
    const user = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new NotFoundException(`User #${username} not found!`);
    }

    return user;
  }

  async getUserById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User #${id} not found!`);
    }

    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }
}
