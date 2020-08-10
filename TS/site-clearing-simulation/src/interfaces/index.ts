/**
 * Interface List
 */

export type MapLayout = Array<Array<string>>;
export type VisLayout = Array<Array<number>>;

export interface IAction {
  type: string
  payload: any
}

export interface IState {
  currentDirection: string
  mapSite: MapLayout
  visited: VisLayout
  commList: Array<string>
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