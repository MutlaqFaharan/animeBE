import {
  GlobalCustomExceptionInterceptor,
  GlobalCustomExceptionFilter,
  GlobalThrottlerGuard,
  GlobalRolesGuard,
  GlobalJwtAuthGuard,
} from './app-constants';

export const GlobalInterceptors = [GlobalCustomExceptionInterceptor];

export const GlobalFilters = [GlobalCustomExceptionFilter];

export const GlobalGuards = [
  GlobalThrottlerGuard,
  GlobalRolesGuard,
  GlobalJwtAuthGuard,
];
