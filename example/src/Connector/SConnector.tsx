import React from "react";
import { BaseShapeConnectorProps } from "./interfaces/Shape";
import { DEFAULT_COLOR, ShapeType } from "./utils/Constants";

export interface SConectorProps extends BaseShapeConnectorProps {
  shape: ShapeType.S;
}

export default function SConnector(props: SConectorProps) {
  const {
    stroke,
    strokeWidth,
    startArrow,
    endArrow,
    startPoint,
    endPoint,
    arrowSize,
    ...rest
  } = props;

  const distanceX = endPoint.x - startPoint.x;
  const distanceY = endPoint.y - startPoint.y;
  const grids = 4;
  const stepX = distanceX / grids;
  const stepY = distanceY / grids;

  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path
        {...rest}
        d={`M
            ${startPoint.x} ${startPoint.y} 
            q 
            ${(stepX * grids) / 2} 0 
            ${(stepX * grids) / 2} ${(stepY * grids) / 2}
            q 
            0 ${(stepY * grids) / 2} 
            ${(stepX * grids) / 2} ${(stepY * grids) / 2}
        `}
        stroke={stroke || DEFAULT_COLOR}
        strokeWidth={strokeWidth || 3}
        fill="transparent"
      />
    </svg>
  );
}
