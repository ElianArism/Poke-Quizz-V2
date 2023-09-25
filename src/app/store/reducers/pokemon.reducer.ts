import { createReducer, on } from '@ngrx/store';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';
import { PokemonActions } from '../actions/pokemon.actions';

export interface PokemonState {
  loadingPokemons: boolean;
  currentPokemon: (Pokemon & { listIdx: number }) | null;
  amountLeftToDiscover: number;
  foundedPokemonIds: number[];
  pokemons: Pokemon[];
}

export const initialState: PokemonState = {
  loadingPokemons: false,
  currentPokemon: null,
  amountLeftToDiscover: 0,
  foundedPokemonIds: [],
  pokemons: [],
};

export const pokemonReducer = createReducer(
  initialState,

  on(PokemonActions.startLoadingPokemons, (state) => {
    return { ...state, loadingPokemons: true };
  }),
  on(PokemonActions.setCurrentPokemon, (state) => {
    let selectedPokemon!: Pokemon & { listIdx: number };

    while (true) {
      const idx: number =
        Math.round(Math.random() * state.amountLeftToDiscover) - 1;
      selectedPokemon = { ...state.pokemons[idx], listIdx: idx };
      const wasFounded = state.foundedPokemonIds.filter(
        (id) => id === selectedPokemon.id
      );
      if (!wasFounded.length) break;
    }

    return {
      ...state,
      currentPokemon: selectedPokemon,
    };
  }),
  on(PokemonActions.pokemonsLoaded, (state, payload) => {
    return {
      ...state,
      pokemons: payload.pokemons,
      amountLeftToDiscover: payload.pokemons.length,
      loadingPokemons: false,
    };
  }),
  on(PokemonActions.removePokemon, (state, payload) => {
    return {
      ...state,
      pokemons: state.pokemons.filter((p) => p.id !== payload.id),
    };
  })
);
