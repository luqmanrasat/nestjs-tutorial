import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './types/user';

@Injectable()
export class UsersService {
  private users: User[] = [
    { username: 'luqman', password: 'luqman' },
    { username: 'abu', password: 'abu' },
    { username: 'ali', password: 'ali' },
  ];

  getUsers() {
    return this.users;
  }

  getUser(username: string) {
    const user = this.users.find((user) => user.username === username);

    if (!user) {
      throw new NotFoundException(`User #${username} not found!`);
    }

    return user;
  }
}
