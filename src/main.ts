import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as csurf from 'csurf';
import { ValidationPipe } from '@nestjs/common';
import {
  I18nValidationExceptionFilter,
  i18nValidationErrorFactory,
} from 'nestjs-i18n';
import { ServerLogger } from './services/logger/server-logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: false,
    logger: new ServerLogger(),
  });

  app.enableCors();
  app.setGlobalPrefix('api');

  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: i18nValidationErrorFactory,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Anime Social Media Platform')
    .setDescription('The Anime API description')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

// when you start a new nest project
// production:
//                                                            ,1,
//                               ......                     .ifL1
//                            .;1ttttLLf1,                 ;fffff,
//                           :LCLfttfLLLLL:              ,tffffffi
//                          ,CCCLf11ff1tff;            ,1Lffffffff.
//                          iLttt11ifLLLfft.           :iitffffffLi
//                          ;t1111ii1fffff1               ffffft;i1.
//                          ,1iiiiii1tt1it,              ifffff,
//                           ;1i;;;;i1tff:              .fffff1
//                           ,t1ii;:::;i;               ifffff,
//                          .,;11iii;:                 .fffff1
//                     ..,,.,,.,iftitGi...             ifffff,
//                 .,,,::::,,,,..;LLLGt::::,,,.       .fffff1
//                 ;,,,,,,,,,,,,,.,;tfi,::,,::::,     ;fffff,
//                 ::,,,,,,,,..,:,,.:ft,::,,:,,::.   .fffff1
//                 ,i:,,,,,,,,..,,,,,,;,:::,:,,,::   ;fffff,
//                 .1:,,,,,,,,..,,,:,,,::,,,:,,,,:, .fffff1
//                  ;;:,,,,,:, ..,,,::,,,:,,:,,,,::.,1tfff:
//                  ,1;:,,,,;f:.,,,,,,:,..,,:,..,,::,  ..,
//                   ;i::,,,,,:,,:,,:,:::,,,;1:,.,,,:,
//                   .;;;:,,,,,,,,,::::::::::LGC;,,,,:.
//                    .;;:,,.,,,,,,,,,,,,,,:::;;:,,,,,:
//                     ,:::,.....,,,,,,,,,,,:,,,,,,,,,:.
//                     ....,....,,,,,,.....,,,,,,,,,,,,.
//                     ,,..     .,::;:........,,,,,...
//                     :,,......      ............
//                     :,...........   ....:,...,.
//                     ,,............. ...,1;,,,,.
//                                         ..
