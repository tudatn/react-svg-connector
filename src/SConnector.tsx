import React from "react";
import { ShapeConnectorProps } from "./SvgConnector";

interface SConectorProps extends ShapeConnectorProps {}

/**
 * S shape svg connector
 * @param startPoint
 * @param endPoint
 * @param stroke
 * @param strokeWidth
 * @param startArrow
 * @param endArrow
 * @param arrowSize
 */
export default function SConnector(props: SConectorProps) {
  const {
    direction,
    stroke,
    strokeWidth,
    startArrow,
    endArrow,
    startPoint,
    endPoint,
    arrowSize,
    ...rest
  } = props;

  const distanceX = props.endPoint.x - props.startPoint.x;
  const distanceY = props.endPoint.y - props.startPoint.y;
  const grids = 4;
  const stepX = distanceX / grids;
  const stepY = distanceY / grids;

  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path
        {...rest}
        d={`M
            ${props.startPoint.x} ${props.startPoint.y} 
            q 
            ${(stepX * grids) / 2} 0 
            ${(stepX * grids) / 2} ${(stepY * grids) / 2}
            q 
            0 ${(stepY * grids) / 2} 
            ${(stepX * grids) / 2} ${(stepY * grids) / 2}
        `}
        stroke={props.stroke || "orange"}
        strokeWidth={props.strokeWidth || 3}
        fill="transparent"
      />
    </svg>
  );
}
