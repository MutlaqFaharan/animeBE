import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserDocument } from 'src/modules/system-users/user/entities/user.entity';
import { checkNullability } from 'src/shared/util/check-nullability.util';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    if (!checkNullability(request.headers.authorization))
      throw new HttpException(
        'auth.errors.unauthorized',
        HttpStatus.UNAUTHORIZED,
      );
    const token = request.headers.authorization?.split(' ')?.[1];
    const user = this.jwtService.decode(token) as UserDocument;
    return this.matchRoles(roles, +user?.role);
  }

  matchRoles(requiredRoles: string[], userRole: number): boolean {
    if (requiredRoles.some((role) => [userRole].includes(+role))) return true;
    throw new HttpException(
      'auth.errors.unauthorized',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
