import { ActionReducerMap } from '@ngrx/store';
import { PokemonState, pokemonReducer } from './reducers/pokemon.reducer';
import { UIReducer, UIState } from './reducers/ui.reducer';

export interface AppState {
  pokemons: PokemonState;
  ui: UIState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  pokemons: pokemonReducer,
  ui: UIReducer,
};
