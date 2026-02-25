import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { AppModule } from './app.module';
import hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(process.cwd(), 'src', 'views'));
  hbs.registerPartials(join(process.cwd(), 'src', 'views', 'partials'));
  app.setViewEngine('hbs');
  app.set('view options', {layout:'structure'});
  await app.listen(process.env.PORT || 3000);
}
bootstrap();