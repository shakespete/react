/**
 * Interface List
 */

export type MapLayout = Array<Array<string>>;

export interface MapProps {
  layout: MapLayout;
  width: number;
  height: number;
}