import React from "react";
import Arrow from "./Arrow";

import { ShapeConnectorProps, ShapeDirection } from "./SvgConnector";

interface NarrowSConnectorProps extends ShapeConnectorProps {
  grids?: number;
  stem?: number;
  roundCorner?: boolean;
  direction?: ShapeDirection;
  minStep?: number;
  arrowSize?: number;
  endArrow?: boolean;
  startArrow?: boolean;
}

export default function NarrowSConnector(props: NarrowSConnectorProps) {
  let coordinates = {
    start: props.start,
    end: props.end,
  };

  if (props.direction === "l2r" || props.direction === "t2b") {
    // swap elements
    coordinates = {
      start: props.end,
      end: props.start,
    };
  }

  const distanceX = coordinates.end.x - coordinates.start.x;
  const distanceY = coordinates.end.y - coordinates.start.y;

  let stem = props.stem || 0;
  const grids = props.grids || 5;

  const radius = props.roundCorner ? 1 : 0;

  const stepX = distanceX / grids;
  const stepY = distanceY / grids;

  if (stem >= Math.abs(distanceX)) {
    stem = Math.abs(distanceX) - Math.abs(stepX);
  }

  let step = Math.min(Math.abs(stepX), Math.abs(stepY));

  step = Math.min(step, props.minStep || step);

  const arrowSize =
    props.arrowSize || (props.strokeWidth ? props.strokeWidth * 3 : 10);

  function corner12(direction?: ShapeDirection) {
    const factor = distanceX * distanceY >= 0 ? 1 : -1;
    const l2lFactor = props.direction === "l2l" ? -1 : 1;

    const pathr2l = `M
                    ${coordinates.start.x} ${coordinates.start.y} 
                    h ${stem * l2lFactor}
                    q ${step * radius * l2lFactor} 0 
                    ${step * radius * l2lFactor} ${step * factor * radius}
                    V ${coordinates.end.y - step * factor * radius}
                    q ${0} ${step * factor * radius}
                    ${step * radius} ${step * factor * radius}
                    H ${coordinates.end.x}
                  `;

    const pathr2r = `M
                    ${coordinates.start.x} ${coordinates.start.y} 
                    h ${stem + distanceX + step} 
                    q ${step * radius} 0 
                    ${step * radius} ${step * factor * radius}
                    V ${coordinates.end.y - step * factor * radius}
                    q 0 ${step * factor * radius}
                    ${-step} ${step * factor * radius}
                    H ${coordinates.end.x}
                  `;

    let path = pathr2l; // default

    switch (direction) {
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
        {props.endArrow && (
          <Arrow
            tip={coordinates.end}
            size={arrowSize}
            rotateAngle={props.direction === "r2r" ? 180 : 0}
            stroke={props.stroke || "orange"}
          />
        )}
        {props.startArrow && (
          <Arrow
            tip={coordinates.start}
            size={arrowSize}
            rotateAngle={props.direction === "l2l" ? 0 : 180}
            stroke={props.stroke || "orange"}
          />
        )}
      </svg>
    );
  }

  function corner21(direction?: ShapeDirection) {
    const factor = distanceX * distanceY >= 0 ? 1 : -1;
    const t2tFactor = props.direction === "t2t" ? -1 : 1;

    const pathb2t = `M
                    ${coordinates.start.x} ${coordinates.start.y} 
                    v ${stem * t2tFactor}
                    q  0 ${step * radius * t2tFactor}
                     ${step * factor * radius} ${step * radius * t2tFactor}
                    H ${coordinates.end.x - step * factor * radius}
                    q ${step * factor * radius} 0
                     ${step * factor * radius} ${step * radius}
                    V ${coordinates.end.y}
                  `;

    const pathb2b = `M
                    ${coordinates.start.x} ${coordinates.start.y} 
                    v ${stem + distanceY + step} 
                    q 0 ${step * radius}
                    ${step * factor * radius} ${step * radius}
                    H ${coordinates.end.x - step * factor * radius}
                    q ${step * factor * radius} 0
                    ${step * factor * radius} ${-step}
                    V ${coordinates.end.y}
                  `;

    let path = pathb2t; // default

    switch (direction) {
      case "b2b":
        path = pathb2b;
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
        {props.endArrow && (
          <Arrow
            tip={coordinates.end}
            size={arrowSize}
            rotateAngle={props.direction === "b2b" ? 270 : 90}
            stroke={props.stroke || "orange"}
          />
        )}
        {props.startArrow && (
          <Arrow
            tip={coordinates.start}
            size={arrowSize}
            rotateAngle={props.direction === "t2t" ? 90 : 270}
            stroke={props.stroke || "orange"}
          />
        )}
      </svg>
    );
  }

  function corner34(direction?: ShapeDirection) {
    const factor = distanceX * distanceY > 0 ? 1 : -1;

    let pathr2l = `M
                    ${coordinates.start.x} ${coordinates.start.y} 
                    h ${stem} 
                    q ${step * radius} 0 
                    ${step * radius} ${-step * factor * radius}
                    v ${distanceY / 2 + step * 2 * factor * radius}
                    q 0 ${-step * factor * radius}
                    ${-step * radius} ${-step * factor * radius}
                    h ${distanceX - stem * 2}
                    q ${-step * radius} 0
                    ${-step * radius} ${-step * factor * radius}
                    V ${coordinates.end.y + step * factor * radius}
                    q 0 ${-step * factor * radius}
                    ${step * radius} ${-step * factor * radius}
                    H ${coordinates.end.x}
                  `;

    let pathl2l = `M
                    ${coordinates.start.x} ${coordinates.start.y} 
                    h ${stem * -1 + distanceX} 
                    q ${step * -1 * radius} 0 
                    ${step * -1 * radius} ${-step * factor * radius}
                    V ${coordinates.end.y + step * factor * radius}
                    q 0 ${-step * factor * radius}
                    ${step * radius} ${-step * factor * radius}
                    H ${coordinates.end.x}
                  `;

    let pathr2r = `M
                    ${coordinates.start.x} ${coordinates.start.y} 
                    h ${stem}
                    q ${step * radius} 0 
                    ${step * radius} ${step * factor * -1 * radius}
                    V ${coordinates.end.y + step * factor * radius}
                    q ${0} ${step * factor * -1 * radius}
                    ${step * -1 * radius} ${step * factor * -1 * radius}
                    H ${coordinates.end.x}
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
        {props.endArrow && (
          <Arrow
            tip={coordinates.end}
            size={arrowSize}
            rotateAngle={props.direction === "r2r" ? 180 : 0}
            stroke={props.stroke || "orange"}
          />
        )}
        {props.startArrow && (
          <Arrow
            tip={coordinates.start}
            size={arrowSize}
            rotateAngle={props.direction === "l2l" ? 0 : 180}
            stroke={props.stroke || "orange"}
          />
        )}
      </svg>
    );
  }

  function corner43(direction?: ShapeDirection) {
    const factor = distanceX * distanceY > 0 ? 1 : -1;

    let pathb2t = `M
                    ${coordinates.start.x} ${coordinates.start.y} 
                    v ${stem} 
                    q 0 ${step * radius}
                    ${-step * factor * radius}  ${step * radius}
                    h ${distanceX / 2 + step * 2 * factor * radius}
                    q ${-step * factor * radius} 0
                    ${-step * factor * radius} ${-step * radius}
                    v ${distanceY - stem * 2}
                    q 0 ${-step * radius}
                     ${-step * factor * radius} ${-step * radius}
                    H ${coordinates.end.x + step * factor * radius}
                    q ${-step * factor * radius} 0
                    ${-step * factor * radius} ${step * radius}
                    V ${coordinates.end.y}
                  `;

    let patht2t = `M
                    ${coordinates.start.x} ${coordinates.start.y} 
                    v ${stem * -1 + distanceY}
                    q 0 ${step * -1 * radius}
                    ${-step * factor * radius} ${step * -1 * radius}
                    H ${coordinates.end.x + step * factor * radius}
                    q ${-step * factor * radius} 0
                    ${-step * factor * radius} ${step * radius} 
                    V ${coordinates.end.y}
                  `;

    let pathb2b = `M
                    ${coordinates.start.x} ${coordinates.start.y} 
                    v ${stem} 
                    q 0 ${step * radius}
                    ${step * factor * -1 * radius} ${step * radius}
                    H ${coordinates.end.x + step * factor * radius}
                    q ${step * factor * -1 * radius} 0
                    ${step * factor * -1 * radius} ${step * -1 * radius}
                    V ${coordinates.end.y}
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
        {props.endArrow && (
          <Arrow
            tip={coordinates.end}
            size={arrowSize}
            rotateAngle={props.direction === "b2b" ? 270 : 90}
            stroke={props.stroke || "orange"}
          />
        )}
        {props.startArrow && (
          <Arrow
            tip={coordinates.start}
            size={arrowSize}
            rotateAngle={props.direction === "t2t" ? 90 : 270}
            stroke={props.stroke || "orange"}
          />
        )}
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
