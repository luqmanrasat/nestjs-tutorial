import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'tutorial_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CustomersModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
