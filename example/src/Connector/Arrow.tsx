import React from "react";
import { Point } from "./SvgConnector";

export interface ArrowProps {
  tip: Point;
  size: number;
  stroke?: string;
  rotateAngle?: number;
}

/**
 * Return an arrow path for svg
 * @param tip arrow tip point
 * @param size arrow size
 * @param stroke arrow filled color
 * @param rotateAngle arrow rotation angle, default = 0
 */

export default function Arrow(props: ArrowProps) {
  const path = `M
                  ${props.tip.x} ${props.tip.y}
                  l ${-props.size} ${-props.size / 2}
                  v ${props.size}
                  z
                `;
  return (
    <path
      d={path}
      fill={props.stroke}
      stroke={props.stroke}
      transform={`rotate(${props.rotateAngle || 0} ${props.tip.x} ${
        props.tip.y
      })`}
    />
  );
}
