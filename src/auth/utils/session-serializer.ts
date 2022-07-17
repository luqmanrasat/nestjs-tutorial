import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/users/entities/user';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    console.log('serialize user');
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    console.log('deserialize user');
    const fetchedUser = await this.usersService.getUserById(user.id);
    if (!fetchedUser) {
      return done(null, null);
    }
    done(null, fetchedUser);
  }
}
