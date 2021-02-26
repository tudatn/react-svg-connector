import React from "react";

import { ShapeConnectorProps, ShapeDirection } from "./SvgConnector";

interface NarrowSConnectorProps extends ShapeConnectorProps {
  grids?: number;
  stem?: number;
  roundCorner?: boolean;
  direction?: ShapeDirection;
  minStep?: number;
}

export default function NarrowSConnector(props: NarrowSConnectorProps) {
  let coordinates = {
    startX: props.startX,
    startY: props.startY,
    endX: props.endX,
    endY: props.endY,
  };

  if (props.direction === "l2r" || props.direction === "t2b") {
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

  const radius = props.roundCorner ? 1 : 0;

  const stepX = distanceX / grids;
  const stepY = distanceY / grids;

  if (stem >= Math.abs(distanceX)) {
    stem = Math.abs(distanceX) - Math.abs(stepX);
  }

  let step = Math.min(Math.abs(stepX), Math.abs(stepY));

  step = Math.max(step, props.minStep || 5);

  function corner12(direction?: ShapeDirection) {
    const factor = distanceX * distanceY >= 0 ? 1 : -1;

    const pathr2l = `M
                    ${coordinates.startX} ${coordinates.startY} 
                    h ${stem}
                    q ${step * radius} 0 
                    ${step * radius} ${step * factor * radius}
                    V ${coordinates.endY - step * factor * radius}
                    q ${0} ${step * factor * radius}
                    ${step} ${step * factor * radius}
                    H ${coordinates.endX}
                  `;

    const pathl2l = `M
                    ${coordinates.startX} ${coordinates.startY} 
                    h ${stem * -1} 
                    q ${step * -1 * radius} 0 
                    ${step * -1 * radius} ${step * factor * radius}
                    V ${coordinates.endY - step * factor * radius}
                    q ${0} ${step * factor * radius}
                    ${step * radius} ${step * factor * radius}
                    H ${coordinates.endX}
                  `;

    const pathr2r = `M
                    ${coordinates.startX} ${coordinates.startY} 
                    h ${stem + distanceX + step} 
                    q ${step * radius} 0 
                    ${step * radius} ${step * factor * radius}
                    V ${coordinates.endY - step * factor * radius}
                    q 0 ${step * factor * radius}
                    ${-step} ${step * factor * radius}
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
      case "b2t":
        path = pathr2l;
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

  function corner21(direction?: ShapeDirection) {
    const factor = distanceX * distanceY >= 0 ? 1 : -1;

    const pathb2t = `M
                    ${coordinates.startX} ${coordinates.startY} 
                    v ${stem}
                    q  0 ${step * radius}
                     ${step * factor * radius} ${step * radius}
                    H ${coordinates.endX - step * factor * radius}
                    q ${step * factor * radius} 0
                     ${step * factor * radius} ${step}
                    V ${coordinates.endY}
                  `;

    const patht2t = `M
                    ${coordinates.startX} ${coordinates.startY} 
                    v ${stem * -1} 
                    q 0 ${step * -1 * radius}
                    ${step * factor * radius} ${step * -1 * radius} 
                    H ${coordinates.endX - step * factor * radius}
                    q ${step * factor * radius} 0
                    ${step * factor * radius} ${step * radius}
                    V ${coordinates.endY}
                  `;

    const pathb2b = `M
                    ${coordinates.startX} ${coordinates.startY} 
                    v ${stem + distanceY + step} 
                    q 0 ${step * radius}
                    ${step * factor * radius} ${step * radius}
                    H ${coordinates.endX - step * factor * radius}
                    q ${step * factor * radius} 0
                    ${step * factor * radius} ${-step}
                    V ${coordinates.endY}
                  `;

    let path = pathb2t; // default

    switch (direction) {
      case "b2b":
        path = pathb2b;
        break;
      case "t2t":
        path = patht2t;
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

    let pathb2t = `M
                    ${coordinates.startX} ${coordinates.startY} 
                    h ${stem} 
                    q ${step * radius} 0 
                    ${step * radius} ${-step * factor * radius}
                    v ${distanceY / 2 + step * 2 * factor * radius}
                    q 0 ${-step * factor * radius}
                    ${-step * radius} ${-step * factor * radius}
                    h ${distanceX - stem * 2}
                    q ${-step * radius} 0
                    ${-step * radius} ${-step * factor * radius}
                    V ${coordinates.endY + step * factor * radius}
                    q 0 ${-step * factor * radius}
                    ${step * radius} ${-step * factor * radius}
                    H ${coordinates.endX}
                  `;

    let pathb2b = `M
                    ${coordinates.startX} ${coordinates.startY} 
                    h ${stem * -1 + distanceX} 
                    q ${step * -1 * radius} 0 
                    ${step * -1 * radius} ${-step * factor * radius}
                    V ${coordinates.endY + step * factor * radius}
                    q 0 ${-step * factor * radius}
                    ${step * radius} ${-step * factor * radius}
                    H ${coordinates.endX}
                  `;

    let patht2t = `M
                    ${coordinates.startX} ${coordinates.startY} 
                    h ${stem} 
                    q ${step * radius} 0 
                    ${step * radius} ${step * factor * -1 * radius}
                    V ${coordinates.endY + step * factor * radius}
                    q ${0} ${step * factor * -1 * radius}
                    ${step * -1 * radius} ${step * factor * -1 * radius}
                    H ${coordinates.endX}
                  `;

    let path = pathb2t; // default

    switch (direction) {
      case "b2b":
        path = pathb2b;
        break;
      case "t2t":
        path = patht2t;
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

  function corner43(direction?: ShapeDirection) {
    const factor = distanceX * distanceY > 0 ? 1 : -1;

    let pathb2t = `M
                    ${coordinates.startX} ${coordinates.startY} 
                    v ${stem} 
                    q 0 ${step * radius}
                    ${-step * factor * radius}  ${step * radius}
                    h ${distanceX / 2 + step * 2 * factor * radius}
                    q ${-step * factor * radius} 0
                    ${-step * factor * radius} ${-step * radius}
                    v ${distanceY - stem * 2}
                    q 0 ${-step * radius}
                     ${-step * factor * radius} ${-step * radius}
                    H ${coordinates.endX + step * factor * radius}
                    q ${-step * factor * radius} 0
                    ${-step * factor * radius} ${step * radius}
                    V ${coordinates.endY}
                  `;

    let patht2t = `M
                    ${coordinates.startX} ${coordinates.startY} 
                    v ${stem * -1 + distanceY}
                    q 0 ${step * -1 * radius}
                    ${-step * factor * radius} ${step * -1 * radius}
                    H ${coordinates.endX + step * factor * radius}
                    q ${-step * factor * radius} 0
                    ${-step * factor * radius} ${step * radius} 
                    V ${coordinates.endY}
                  `;

    let pathb2b = `M
                    ${coordinates.startX} ${coordinates.startY} 
                    v ${stem} 
                    q 0 ${step * radius}
                    ${step * factor * -1 * radius} ${step * radius}
                    H ${coordinates.endX + step * factor * radius}
                    q ${step * factor * -1 * radius} 0
                    ${step * factor * -1 * radius} ${step * -1 * radius}
                    V ${coordinates.endY}
                  `;

    let path = pathb2t; // default

    switch (direction) {
      case "b2b":
        path = pathb2b;
        break;
      case "t2t":
        path = patht2t;
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

  const ySpaceDirections = ["b2t", "b2b", "t2t", "t2b"];
  if (ySpaceDirections.includes(props.direction || "")) {
    if (distanceY >= 0) {
      return corner21(props.direction);
    } else {
      return corner43(props.direction);
    }
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
