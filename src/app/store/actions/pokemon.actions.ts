import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Pokemon } from 'src/app/interfaces/pokemon.interface';

export const PokemonActions = createActionGroup({
  source: '[Pokemons]',
  events: {
    'Start loading pokemons': emptyProps(),
    'Pokemons loaded': props<{ pokemons: Pokemon[] }>(),
    'Set current pokemon': emptyProps(),
    'Remove pokemon': props<{ id: number }>(),
    'Pokemon founded': props<{ id: number }>(),
  },
});
