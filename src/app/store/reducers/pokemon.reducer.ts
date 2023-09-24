import { createReducer, on } from '@ngrx/store';
import { PokemonActions } from '../actions/pokemon.actions';

export interface PokemonState {
  loadingPokemons: boolean;
  currentPokemon: any;
  pokemons: any[];
}

export const initialState: PokemonState = {
  loadingPokemons: false,
  currentPokemon: null,
  pokemons: [],
};

export const pokemonReducer = createReducer(
  initialState,

  on(PokemonActions.startLoadingPokemons, (state) => {
    return { ...state, loadingPokemons: true };
  }),
  on(PokemonActions.setCurrentPokemon, (state, payload) => {
    return {
      ...state,
      currentPokemon: payload.pokemon,
    };
  }),
  on(PokemonActions.pokemonsLoaded, (state, payload) => {
    return {
      ...state,
      pokemons: payload.pokemons,
    };
  })
);
