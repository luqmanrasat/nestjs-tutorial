import { Injectable } from '@nestjs/common';
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
    return this.users.find((user) => user.username === username);
  }
}
