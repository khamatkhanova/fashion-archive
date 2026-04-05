import {Resolver, Query, Mutation, Args, Int} from '@nestjs/graphql';
import {FavoritesService} from './favorites.service';
import {FavoriteObject} from './dto/favorite.object';
import {CreateFavoriteInput} from './dto/create-favorite.input';

@Resolver(() => FavoriteObject)
export class FavoritesResolver {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Query(() => [FavoriteObject], {name: 'favorites'})
  getFavorites(
    @Args('page', {type: () => Int, nullable: true}) page = 1,
    @Args('limit', {type: () => Int, nullable: true}) limit = 10,
  ) {
    return this.favoritesService.findPaginated(page, limit);
  }

  @Mutation(() => FavoriteObject)
  createFavorite(@Args('data') data: CreateFavoriteInput) {
    return this.favoritesService.create(data);
  }

  @Mutation(() => FavoriteObject)
  removeFavorite(@Args('id', {type: () => Int}) id: number,) {
    return this.favoritesService.remove(id);
  }
}