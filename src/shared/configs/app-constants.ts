import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CustomExceptionInterceptor } from 'src/interceptors/exception-translation.interceptor';

export const GlobalJwtAuthGuard = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};

export const GlobalRolesGuard = {
  provide: APP_GUARD,
  useClass: RolesGuard,
};

export const GlobalCustomExceptionInterceptor = {
  provide: APP_INTERCEPTOR,
  useClass: CustomExceptionInterceptor,
};

export const GlobalCustomExceptionFilter = {
  provide: APP_FILTER,
  useClass: CustomExceptionInterceptor,
};

export const GlobalThrottlerGuard = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
};
