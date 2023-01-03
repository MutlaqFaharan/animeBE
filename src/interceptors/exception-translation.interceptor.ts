import {
  CallHandler,
  Catch,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { map, Observable } from 'rxjs';
import { ServerLogger } from 'src/services/logger/server-logger';

@Catch(HttpException)
@Injectable()
export class CustomLoggerInterceptor implements NestInterceptor {
  constructor(
    private readonly i18n: I18nService,
    private readonly logger: ServerLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const lang = request.headers['accept-language'];
    const response = context.switchToHttp().getResponse();
    this.logger.APIlog(
      request.originalUrl,
      'CustomLoggerInterceptor - Request',
      request,
      69, // ! Nice
    );
    return next.handle().pipe(
      map(async (data) => {
        this.logger.APIlog(
          request.originalUrl,
          'CustomLoggerInterceptor - Response',
          request,
          response.statusCode,
        );
        if (data && (data.message || data.error)) {
          let customMessage = '';
          try {
            customMessage = await this.i18n.translate(
              data.message ?? data.error,
              { lang },
            );
          } catch (err) {
            customMessage = data.message ?? data.error;
            this.logger.APIlog(
              request.originalUrl,
              'CustomLoggerInterceptor',
              request,
              response.statusCode,
              customMessage,
            );
          }
          return { ...data, message: customMessage };
        } else return data;
      }),
    );
  }
}
