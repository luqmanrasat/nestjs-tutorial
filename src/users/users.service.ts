import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './types/user';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, username: 'luqman', password: 'luqman' },
    { id: 2, username: 'abu', password: 'abu' },
    { id: 3, username: 'ali', password: 'ali' },
  ];

  getUsers() {
    return this.users;
  }

  getUserByUsername(username: string) {
    const user = this.users.find((user) => user.username === username);

    if (!user) {
      throw new NotFoundException(`User #${username} not found!`);
    }

    return user;
  }

  getUserById(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User #${id} not found!`);
    }

    return user;
  }
}
