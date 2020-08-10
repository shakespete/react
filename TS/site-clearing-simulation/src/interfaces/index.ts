/**
 * Interface List
 */

export type MapLayout = Array<Array<string>>;

export interface IAction {
  type: string
  payload: any
}

export interface IState {
  currentDirection: string
  mapSite: MapLayout
  visited: Array<Array<number>>
  commList: Array<string>
  commCount: number
  fuelUsage: number
  paintDmg: number
  totalRows: number
  totalCols: number
  currRow: number
  currCol: number
}

export interface IMapProps {
  width: number
  height: number
}