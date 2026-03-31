import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { AppModule } from './app.module';
import hbs from 'hbs';
import {AllExceptionsFilter} from './filter';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,);

  const config = new DocumentBuilder().setTitle('M.M archive').setDescription('документация').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setBaseViewsDir(join(process.cwd(), 'src', 'views'));
  hbs.registerPartials(join(process.cwd(), 'src', 'views', 'partials'));
  app.setViewEngine('hbs');
  app.set('view options', {layout:'layout'});
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();