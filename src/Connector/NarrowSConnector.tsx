import React from "react";

import { ShapeConnectorProps, ShapeDirection } from ".";

interface NarrowSConnectorProps extends ShapeConnectorProps {
  grids?: number;
  stem?: number;
  radius?: number;
  direction?: ShapeDirection;
}

export default function NarrowSConnector(props: NarrowSConnectorProps) {
  let coordinates = {
    startX: props.startX,
    startY: props.startY,
    endX: props.endX,
    endY: props.endY,
  };

  if (props.direction === "l2r") {
    // swap elements
    coordinates = {
      startX: props.endX,
      startY: props.endY,
      endX: props.startX,
      endY: props.startY,
    };
  }

  const distanceX = coordinates.endX - coordinates.startX;
  const distanceY = coordinates.endY - coordinates.startY;

  let stem = props.stem || 0;
  const grids = props.grids || 5;
  if (stem >= grids - 1) {
    stem = grids - 2;
  }
  const stepX = distanceX / grids;
  const stepY = distanceY / grids;

  const step = Math.min(Math.abs(stepX), Math.abs(stepY));

  function corner12(direction?: ShapeDirection) {
    const factor = distanceX * distanceY >= 0 ? 1 : -1;

    let pathr2l = `M
                  ${coordinates.startX} ${coordinates.startY} 
                  h ${step * stem} 
                  q ${step} 0 
                  ${step} ${step * factor}
                  V ${coordinates.endY - step * factor}
                  q ${0} ${step * factor}
                  ${step} ${step * factor}
                  H ${coordinates.endX}
                  `;
    let pathl2l = `M
                    ${coordinates.startX} ${coordinates.startY} 
                    h ${step * stem * -1} 
                    q ${step * -1} 0 
                    ${step * -1} ${step * factor}
                    V ${coordinates.endY - step * factor}
                    q ${0} ${step * factor}
                    ${step} ${step * factor}
                    H ${coordinates.endX}
                  `;
    let pathr2r = `M
                  ${coordinates.startX} ${coordinates.startY} 
                  h ${step * stem + distanceX + step} 
                  q ${step} 0 
                  ${step} ${step * factor}
                  V ${coordinates.endY - step * factor}
                  q 0 ${step * factor}
                  ${-step} ${step * factor}
                  H ${coordinates.endX}
                `;

    let path = pathr2l; // default
    switch (direction) {
      case "l2l":
        path = pathl2l;
        break;
      case "r2r":
        path = pathr2r;
        break;
      default:
        break;
    }
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path
          d={path}
          stroke={props.stroke || "orange"}
          strokeWidth={props.strokeWidth || 3}
          fill="transparent"
        />
      </svg>
    );
  }

  function corner34(direction?: ShapeDirection) {
    const factor = distanceX * distanceY > 0 ? 1 : -1;

    let pathr2l = `M
                    ${coordinates.startX} ${coordinates.startY} 
                    h ${step * stem} 
                    q ${step} 0 
                    ${step} ${-step * factor}
                    v ${distanceY / 2 + step * 2 * factor}
                    q 0 ${-step * factor}
                    ${-step} ${-step * factor}
                    h ${distanceX - step - step * stem}
                    q ${-step} 0
                    ${-step} ${-step * factor}
                    V ${coordinates.endY + step * factor}
                    q 0 ${-step * factor}
                    ${step} ${-step * factor}
                    H ${coordinates.endX}
                  `;

    let pathl2l = `M
                  ${coordinates.startX} ${coordinates.startY} 
                  h ${step * stem + distanceX - step} 
                  q ${step * -1} 0 
                  ${step * -1} ${-step * factor}
                  V ${coordinates.endY + step * factor}
                  q 0 ${-step * factor}
                  ${step} ${-step * factor}
                  H ${coordinates.endX}
                `;
    let pathr2r = `M
                  ${coordinates.startX} ${coordinates.startY} 
                  h ${step * stem} 
                  q ${step} 0 
                  ${step} ${step * factor * -1}
                  V ${coordinates.endY + step * factor}
                  q ${0} ${step * factor * -1}
                  ${step * -1} ${step * factor * -1}
                  H ${coordinates.endX}
                `;
    let path = pathr2l; // default
    switch (direction) {
      case "l2l":
        path = pathl2l;
        break;
      case "r2r":
        path = pathr2r;
        break;
      default:
        break;
    }
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path
          d={path}
          stroke={props.stroke || "orange"}
          strokeWidth={props.strokeWidth || 3}
          fill="transparent"
        />
      </svg>
    );
  }

  // corner 1 & 2
  if (distanceX >= 0) {
    return corner12(props.direction);
  }

  // corner 4 & 3
  else {
    return corner34(props.direction);
  }
}
