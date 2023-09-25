import { ActionReducerMap } from '@ngrx/store';
import { PokemonState, pokemonReducer } from './reducers/pokemon.reducer';

export interface AppState {
  pokemons: PokemonState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  pokemons: pokemonReducer,
};
