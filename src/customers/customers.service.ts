import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  getCustomer() {
    return {
      id: 1,
      email: 'luqman@gmail.com',
      createdAt: new Date(),
    };
  }
}
