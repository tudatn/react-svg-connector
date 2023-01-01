import React from "react";
import { Point } from "./interfaces/Point";
import { DEFAULT_COLOR } from "./utils/Constants";

export interface ArrowProps {
  /** arrow tip point */
  tip: Point;
  /** arrow size (stroke width) */
  size: number;
  /** arrow filled color */
  stroke?: string;
  /** rarrow rotation angle */
  rotateAngle?: number;
}

export default function Arrow({
  tip,
  size,
  stroke = DEFAULT_COLOR,
  rotateAngle = 0,
}: ArrowProps) {
  const path = `M
                  ${tip.x} ${tip.y}
                  l ${-size} ${-size / 2}
                  v ${size}
                  z
                `;
  return (
    <path
      d={path}
      fill={stroke}
      stroke={stroke}
      transform={`rotate(${rotateAngle || 0} ${tip.x} ${tip.y})`}
    />
  );
}
