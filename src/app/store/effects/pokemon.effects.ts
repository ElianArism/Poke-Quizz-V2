import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { PokemonApiService } from 'src/app/services/pokemon-api.service';
import { PokemonActions } from '../actions/pokemon.actions';

@Injectable()
export class PokemonEffects {
  private actions$: Actions = inject(Actions);
  private pokemonService: PokemonApiService = inject(PokemonApiService);

  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.startLoadingPokemons),
      switchMap(() =>
        this.pokemonService
          .getAllPokemons()
          .pipe(
            map(({ results }: any) =>
              PokemonActions.pokemonsLoaded({ pokemons: results })
            )
          )
      )
    )
  );

  setCurrentPokemon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PokemonActions.pokemonsLoaded),
      switchMap(async () => PokemonActions.setCurrentPokemon())
    )
  );
}
