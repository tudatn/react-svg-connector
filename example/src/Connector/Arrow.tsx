import React from "react";
import { Point } from "./SvgConnector";

export interface ArrowProps {
  tip: Point;
  size: number;
  stroke?: string;
  strokeWidth?: number;
  rotateAngle?: number;
}

export default function Arrow(props: ArrowProps) {
  const path = `M
    ${props.tip.x} ${props.tip.y}
    l ${-props.size} ${-props.size / 2}
    l ${props.size / 2} ${props.size / 2}
    l ${-props.size / 2} ${props.size / 2}
    z
  `;

  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path
        d={path}
        stroke={props.stroke || "orange"}
        strokeWidth={props.strokeWidth || 3}
        fill={props.stroke || "orange"}
      />
    </svg>
  );
}
