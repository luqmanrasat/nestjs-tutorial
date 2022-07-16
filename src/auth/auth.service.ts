import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async validateUser(username: string, password: string) {
    console.log('inside auth service');
    const user = await this.userRepository.findOneBy({username})
    if (!user || user.password !== password) {
      return null;
    }
    return user;
  }
}
