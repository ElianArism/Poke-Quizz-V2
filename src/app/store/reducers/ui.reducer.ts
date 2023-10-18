import { createReducer, on } from '@ngrx/store';
import { UIActions } from '../actions/ui.actions';

export interface UIState {
  backgroundColor: string;
  bgType: 'custom' | 'default';
}

export const initialState: UIState = {
  backgroundColor:
    'linear-gradient(0, rgb(241, 12, 12) 0%, rgba(243, 243, 243, 1) 100%)',
  bgType: 'default',
};

export const UIReducer = createReducer(
  initialState,
  on(UIActions.changeAppBackgroundColor, (state, { color, bgType }) => {
    return {
      ...state,
      bgType: bgType || 'default',
      backgroundColor: color,
    };
  })
);
