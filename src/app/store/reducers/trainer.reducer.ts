import { createReducer, on } from '@ngrx/store';
import { TrainerActions } from '../actions/trainer.actions';

export interface TrainerState {
  id: string;
  imgLogo: string;
  trainerName: string;
  score: number;
}

const initialState: TrainerState = {
  id: '',
  imgLogo: '',
  trainerName: '',
  score: 0,
};

export const trainerReducer = createReducer(
  initialState,
  on(TrainerActions.trainerLoaded, (state, { trainer }) => {
    return {
      id: trainer.id,
      imgLogo: trainer.imgLogo,
      trainerName: trainer.trainerName,
      score: trainer.score,
    };
  })
);
