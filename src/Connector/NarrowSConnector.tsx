import React from "react";

import { ShapeConnectorProps } from ".";

interface NarrowSConnectorProps extends ShapeConnectorProps {
  grids?: number;
  stem?: number;
  radius?: number;
}

export default function NarrowSConnector(props: NarrowSConnectorProps) {
  const distanceX = props.endX - props.startX;
  const distanceY = props.endY - props.startY;

  let stem = props.stem || 0;
  const grids = props.grids || 5;
  if (stem >= grids - 1) {
    stem = grids - 2;
  }
  const stepX = distanceX / grids;
  const stepY = distanceY / grids;

  const step = Math.min(Math.abs(stepX), Math.abs(stepY));

  // corner 1 & 2
  if (distanceX >= 0) {
    const factor = distanceX * distanceY >= 0 ? 1 : -1;
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path
          d={`M
                ${props.startX} ${props.startY} 
                h ${step * stem} 
                q ${step} 0 
                ${step} ${step * factor}
                V ${props.endY - step * factor}
                q ${0} ${step * factor}
                ${step} ${step * factor}
                H ${props.endX}
                `}
          stroke={props.stroke || "orange"}
          strokeWidth={props.strokeWidth || 3}
          fill="transparent"
        />
      </svg>
    );
  }

  // corner 4 & 3
  else {
    const factor = distanceX * distanceY > 0 ? 1 : -1;
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path
          d={`M
                ${props.startX} ${props.startY} 
                h ${step * stem} 
                q ${step} 0 
                ${step} ${-step * factor}
                v ${distanceY / 2 + step * 2 * factor}
                q 0 ${-step * factor}
                ${-step} ${-step * factor}
                h ${distanceX - step - step * stem}
                q ${-step} 0
                ${-step} ${-step * factor}
                V ${props.endY + step * factor}
                q 0 ${-step * factor}
                ${step} ${-step * factor}
                H ${props.endX}
                `}
          stroke={props.stroke || "orange"}
          strokeWidth={props.strokeWidth || 3}
          fill="transparent"
        />
      </svg>
    );
  }
}
