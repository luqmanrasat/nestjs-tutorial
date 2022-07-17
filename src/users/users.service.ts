import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.usersRepository.find();
  }

  getUserByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  getUserById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async createUser(createUserDto: CreateUserDto) {
    const salt = await genSalt();
    const hashedPassword = await hash(createUserDto.password, salt);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }
}
