/**
 * ALL app Interfaces
 */

export interface IEpisode {
  airdate: string
  airstamp: string
  airtime: string
  id: number
  image: {
    medium: string,
    original: string
  }
  name: string
  number: number
  runtime: number
  season: number
  summary: string
  url: string
}

export interface IAction {
  type: string,
  payload: Array<IEpisode> | any
}

export interface IState {
  episodes: Array<IEpisode>
  favourites: Array<IEpisode>
}

export interface IEpisodesListProps {
  episodes: Array<IEpisode>
  toggleFav: (episode: IEpisode, state: IState, dispatch: Dispatch) => IAction
  state: IState
  dispatch: Dispatch
  favourites: Array<IEpisode>
}

export type Dispatch  = React.Dispatch<IAction>;