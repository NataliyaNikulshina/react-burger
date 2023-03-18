import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TOrderAction } from '../actions/order';
import { TConstructorAction } from '../actions/constructor';
import { TGetItemsActions } from '../actions/ingredients';

type TApplicationActions = TGetItemsActions | TConstructorAction | TOrderAction;
export type RootState = ReturnType<typeof store.getState>;
//export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;