import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ITrainer } from 'src/app/interfaces/trainer.interface';

export const TrainerActions = createActionGroup({
  source: '[Trainer]',
  events: {
    'Start loading trainer': emptyProps(),
    'Trainer loaded': props<{ trainer: ITrainer }>(),
  },
});
