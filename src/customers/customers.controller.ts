import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  getCustomers() {
    return this.customersService.getCustomers();CreateCustomerDto
  }

  @Get(':id')
  async getCustomer(@Param('id', ParseIntPipe) id: number) {
    const customer = await this.customersService.getCustomer(id);

    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found!`);
    }

    return customer;
  }

  @Post()
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.createCustomer(createCustomerDto);
  }
}
