import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './types/customer';

@Injectable()
export class CustomersService {
  private customers: Customer[] = [
    {
      id: 1,
      email: 'luqman@gmail.com',
      name: 'luqman',
    },
    {
      id: 2,
      email: 'abu@gmail.com',
      name: 'abu',
    },
    {
      id: 3,
      email: 'ali@gmail.com',
      name: 'ali',
    },
  ];

  getCustomers() {
    return this.customers;
  }

  getCustomer(id: number) {
    return this.customers.find((customer) => customer.id === id);
  }

  createCustomer(createCustomerDto: CreateCustomerDto) {
    const customer: Customer = createCustomerDto;
    this.customers.push(customer);
    return customer;
  }
}
