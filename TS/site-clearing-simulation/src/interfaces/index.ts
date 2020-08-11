/**
 * Interface List
 */

export type MapLayout = Array<Array<string>>;
export type VisLayout = Array<Array<number>>;
export type CommList = Array<string>;
export type Dispatch  = React.Dispatch<IAction>;

export interface IAction {
  type: string
  payload: any
}

export interface IMessageProps {
  message: string
  dispatch: Dispatch
}

export interface IState {
  currentDirection: string
  mapSite: MapLayout
  visited: VisLayout
  commList: CommList
  commCount: number
  fuelUsage: number
  paintDmg: number
  protectedTree: number
  totalRows: number
  totalCols: number
  unclearedSquares: number
  currRow: number
  currCol: number
  simInProgress: boolean
  message: string
}

export interface IMapProps {
  width: number
  height: number
}

export interface ICommandRowProps {
  index: number
  command: string
}