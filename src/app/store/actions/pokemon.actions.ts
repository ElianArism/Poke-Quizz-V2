import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const PokemonActions = createActionGroup({
  source: '[Pokemons]',
  events: {
    'Start loading pokemons': emptyProps(),
    'Pokemons loaded': props<{ pokemons: any[] }>(),
    'Set current pokemon': props<{ pokemon: any }>(),
  },
});
