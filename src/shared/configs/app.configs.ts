import {
  GlobalCustomLoggerInterceptor,
  GlobalThrottlerGuard,
  GlobalRolesGuard,
  GlobalJwtAuthGuard,
  GlobalCustomHTTPExceptionFilter,
} from './app-constants';

export const GlobalInterceptors = [GlobalCustomLoggerInterceptor];

export const GlobalFilters = [GlobalCustomHTTPExceptionFilter];

export const GlobalGuards = [
  GlobalThrottlerGuard,
  GlobalRolesGuard,
  GlobalJwtAuthGuard,
];
