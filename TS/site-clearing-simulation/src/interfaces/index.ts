/**
 * Interface List
 */

export type MapLayout = Array<Array<string>>;
export type VisLayout = Array<Array<number>>;
export type CommList = Array<string>;

export interface IAction {
  type: string
  payload: any
}

export interface IState {
  currentDirection: string
  mapSite: MapLayout
  visited: VisLayout
  commList: CommList
  commCount: number
  fuelUsage: number
  paintDmg: number
  totalRows: number
  totalCols: number
  currRow: number
  currCol: number
  simInProgress: boolean
}

export interface IMapProps {
  width: number
  height: number
}