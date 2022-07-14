import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  users = [
    {
      id: 1,
      email: 'luqman@gmail.com',
      createdAt: new Date(),
    },
    {
      id: 2,
      email: 'abu@gmail.com',
      createdAt: new Date(),
    },
    {
      id: 3,
      email: 'ali@gmail.com',
      createdAt: new Date(),
    },
  ];

  getCustomer(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
