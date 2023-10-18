import { createActionGroup, props } from '@ngrx/store';

export const UIActions = createActionGroup({
  source: '[UI]',
  events: {
    'Change app background color': props<{
      color: string;
      bgType?: 'default' | 'custom';
    }>(),
  },
});
