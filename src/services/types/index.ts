import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
// import { TCountriesActions } from '../actions/countries';
import { TConstructorAction } from '../actions/constructor';
import { TGetItemsActions } from '../actions/ingredients';

type TApplicationActions = TGetItemsActions | TConstructorAction;
export type RootState = ReturnType<typeof store.getState>;
//export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;