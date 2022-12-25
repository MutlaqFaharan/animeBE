import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CustomHTTPExceptionFilter } from 'src/filters/custom-http-exception.filter';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { CustomLoggerInterceptor } from 'src/interceptors/exception-translation.interceptor';

export const GlobalJwtAuthGuard = {
  provide: APP_GUARD,
  useClass: JwtAuthGuard,
};

export const GlobalRolesGuard = {
  provide: APP_GUARD,
  useClass: RolesGuard,
};

export const GlobalCustomLoggerInterceptor = {
  provide: APP_INTERCEPTOR,
  useClass: CustomLoggerInterceptor,
};

export const GlobalCustomHTTPExceptionFilter = {
  provide: APP_FILTER,
  useClass: CustomHTTPExceptionFilter,
};

export const GlobalThrottlerGuard = {
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
};
