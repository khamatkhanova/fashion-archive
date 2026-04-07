import { PrismaService } from './prisma.service';
import { ProductsModule } from './products/products.module';
import { FavoritesModule } from './favorites/favorites.module';
import { CartModule } from './cart/cart.module';
import { TodosModule } from './todos/todos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import queryComplexity, { simpleEstimator } from 'graphql-query-complexity';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({driver: ApolloDriver, autoSchemaFile: join(process.cwd(), 'src/schema.gql'), playground: true,
      validationRules: [queryComplexity({maximumComplexity: 200,
          estimators: [simpleEstimator({ defaultComplexity: 1 })], onComplete: (complexity: number) => {console.log('сomplexity:', complexity);}, }),], }),
    ProductsModule, FavoritesModule, CartModule, TodosModule,StorageModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}