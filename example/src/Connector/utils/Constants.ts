export const DEFAULT_COLOR = "orange";

export const DEFAULT_STROKE_WIDTH = 3;

/** Possible connector shapes */
export enum ShapeType {
  S,
  Line,
  NarrowS,
}

/** Possible connector directions */
export enum ConnectorDirectionType {
  Right2Left = "r2l",
  Left2Right = "l2r",
  Left2Left = "l2l",
  Right2Right = "r2r",
  Bottom2Top = "b2t",
  Bottom2Bottom = "b2b",
  Top2Top = "t2t",
  Top2Bottom = "t2b",
}
