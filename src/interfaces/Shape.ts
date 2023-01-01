import { ShapeType } from "../utils/Constants";
import { Point } from "./Point";

/** Base props for all shape connectors */
export interface BaseShapeConnectorProps
  extends React.SVGProps<SVGPathElement> {
  /** connector shape */
  shape: ShapeType;
  /** start point */
  startPoint: Point;
  /** end point */
  endPoint: Point;
  /** stroke color */
  stroke?: string;
  /** stroke width */
  strokeWidth?: number;
  /** show start arrow */
  startArrow?: boolean;
  /** show end arrow */
  endArrow?: boolean;
  /** arrow size (stroke width) */
  arrowSize?: number;
}
