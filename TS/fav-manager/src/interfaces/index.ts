/**
 * ALL app Interfaces
 */

export interface IState {
  episodes: [],
  favourites: []
}

export interface IAction {
  type: string,
  payload: any
}

export type Dispatch  = React.Dispatch<IAction>;