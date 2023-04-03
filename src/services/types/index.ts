import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TOrderAction } from '../actions/order';
import { TUserAction } from "../actions/user";
import { TConstructorAction } from '../actions/constructor';
import { TGetItemsActions } from '../actions/ingredients';
import { TWsUserAction } from '../actions/user-ws';
import { TWsFeedAction } from '../actions/feed-ws';
import { TIngredientDetailsAction } from '../actions/ingredient-details'

type TApplicationActions = TGetItemsActions | TConstructorAction | TOrderAction | TUserAction | TWsFeedAction | TWsUserAction | TIngredientDetailsAction;
export type RootState = ReturnType<typeof store.getState>;
//export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;