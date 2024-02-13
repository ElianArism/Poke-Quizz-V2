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

    const idx: number =
      Math.round(Math.random() * state.amountLeftToDiscover) - 1;
    selectedPokemon = { ...state.pokemons[idx], listIdx: idx };

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
  }),
  // hice esto para poder eliminar los pokemones encontrados del array de pokemones a elegir, con esto se puede refactorizar la accion
  // setCurrentPokemon y asi evitar hacer un filter dentro del whiile, incluso se podria evitar el bucle while,
  // quedaria terminar el refactor y tambien crear un efecto o realizar un trigger de pokemonFounded, y una nueva accion para seleccionar
  // el pokemon siguiente que se mostrara en el quizz
  on(PokemonActions.pokemonFounded, (state, payload) => {
    const pokemons = state.pokemons.filter((p) => p.id !== payload.id);
    const foundedPokemonIds = state.foundedPokemonIds.concat([payload.id]);
    const amountLeftToDiscover = pokemons.length;
    return {
      ...state,
      pokemons,
      foundedPokemonIds,
      amountLeftToDiscover,
    };
  })
);
