import { ActionReducerMap } from '@ngrx/store';
import { PokemonState, pokemonReducer } from './reducers/pokemon.reducer';
import { TrainerState, trainerReducer } from './reducers/trainer.reducer';
import { UIReducer, UIState } from './reducers/ui.reducer';

export interface AppState {
  pokemons: PokemonState;
  ui: UIState;
  trainer: TrainerState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  pokemons: pokemonReducer,
  ui: UIReducer,
  trainer: trainerReducer,
};
