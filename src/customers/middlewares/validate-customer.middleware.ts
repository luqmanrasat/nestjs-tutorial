import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('from ValidateCustomerMiddleware');
    const { authorization } = req.headers;

    if (!authorization) {
      throw new ForbiddenException('No authentication token provided!');
    }

    if (authorization !== 'lol') {
      throw new ForbiddenException('Invalid authentication token!');
    }
    next();
  }
}
