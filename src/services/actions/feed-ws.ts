export const WS_CONNECTION_START: 'WS_CONNECTION_START' = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSE: 'WS_CONNECTION_CLOSE' = "WS_CONNECTION_CLOSE";
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = "WS_GET_MESSAGE";

export interface IWsStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}
export interface IWsConnectionAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}
export interface IWsCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE;
}
export interface IWsClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: string;
}

export const wsConnectionStart = (url: string): IWsStartAction => {
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
};

export const wsConnectionSuccess = (): IWsConnectionAction => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (event: string): IWsErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
    payload: event,
  };
};

export const wsConnectionClose = (): IWsCloseAction => {
  return {
    type: WS_CONNECTION_CLOSE,
  };
};

export const wsConnectionClosed = (): IWsClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (message: string): IWsGetMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};