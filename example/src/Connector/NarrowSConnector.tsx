import React from "react";
import Arrow from "./Arrow";
import { BaseShapeConnectorProps } from "./interfaces/Shape";
import {
  ConnectorDirectionType,
  DEFAULT_COLOR,
  ShapeType,
} from "./utils/Constants";
import { isYSpaceDirections } from "./utils/SpaceDirection";

export interface NarrowSConnectorProps extends BaseShapeConnectorProps {
  shape: ShapeType.NarrowS;
  /** number of columns in X/Y axis */
  grids?: number;
  /** min distance from the start point to the first transition */
  stem?: number;
  /** true to have a curve transition */
  roundCorner?: boolean;
  /** (right, left, top, bottom) --> (right, left, top, bottom) */
  narrowSDirection?: ConnectorDirectionType;
  /** radius of the transition curve, default is min of (deltaX/grid, deltaY/grid) */
  minStep?: number;
  /** distance from the start point to the first transition */
  startStem?: number;
  /** distance from the last transition to the end point */
  endStem?: number;
}

export default function NarrowSConnector({
  narrowSDirection,
  stroke,
  strokeWidth,
  startArrow,
  endArrow,
  startPoint,
  endPoint,
  arrowSize,
  roundCorner = true,
  minStep,
  startStem,
  endStem,
  stem = 0,
  grids = 5,
  ...rest
}: NarrowSConnectorProps) {
  let coordinates = {
    start: startPoint,
    end: endPoint,
  };

  if (
    narrowSDirection === ConnectorDirectionType.Left2Right ||
    narrowSDirection === ConnectorDirectionType.Top2Bottom
  ) {
    // swap elements
    coordinates = {
      start: endPoint,
      end: startPoint,
    };
  }

  const distanceX = coordinates.end.x - coordinates.start.x;
  const distanceY = coordinates.end.y - coordinates.start.y;

  const radius = roundCorner ? 1 : 0;

  const stepX = distanceX / grids;
  const stepY = distanceY / grids;

  if (stem >= Math.abs(distanceX)) {
    stem = Math.abs(distanceX) - Math.abs(stepX);
  }

  let step = Math.min(Math.abs(stepX), Math.abs(stepY));

  step = Math.min(step, minStep || step);

  const cArrowSize = arrowSize || (strokeWidth ? strokeWidth * 3 : 10);

  function corner12(direction?: ConnectorDirectionType) {
    const factor = distanceX * distanceY >= 0 ? 1 : -1;
    const l2lFactor = direction === ConnectorDirectionType.Left2Left ? -1 : 1;

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
      case ConnectorDirectionType.Right2Right:
        path = pathr2r;
        break;
      default:
        break;
    }
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path
          {...rest}
          d={path}
          stroke={stroke || DEFAULT_COLOR}
          strokeWidth={strokeWidth || 3}
          fill="transparent"
        />
        {endArrow && (
          <Arrow
            tip={coordinates.end}
            size={cArrowSize}
            rotateAngle={
              direction === ConnectorDirectionType.Right2Right ? 180 : 0
            }
            stroke={stroke || DEFAULT_COLOR}
          />
        )}
        {startArrow && (
          <Arrow
            tip={coordinates.start}
            size={cArrowSize}
            rotateAngle={
              direction === ConnectorDirectionType.Left2Left ? 0 : 180
            }
            stroke={stroke || DEFAULT_COLOR}
          />
        )}
      </svg>
    );
  }

  function corner21(direction?: ConnectorDirectionType) {
    const factor = distanceX * distanceY >= 0 ? 1 : -1;
    const t2tFactor = direction === ConnectorDirectionType.Top2Top ? -1 : 1;

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
      case ConnectorDirectionType.Bottom2Bottom:
        path = pathb2b;
        break;
      default:
        break;
    }
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path
          {...rest}
          d={path}
          stroke={stroke || DEFAULT_COLOR}
          strokeWidth={strokeWidth || 3}
          fill="transparent"
        />
        {endArrow && (
          <Arrow
            tip={coordinates.end}
            size={cArrowSize}
            rotateAngle={
              direction === ConnectorDirectionType.Bottom2Bottom ? 270 : 90
            }
            stroke={stroke || DEFAULT_COLOR}
          />
        )}
        {startArrow && (
          <Arrow
            tip={coordinates.start}
            size={cArrowSize}
            rotateAngle={
              direction === ConnectorDirectionType.Top2Top ? 90 : 270
            }
            stroke={stroke || DEFAULT_COLOR}
          />
        )}
      </svg>
    );
  }

  function corner34(direction?: ConnectorDirectionType) {
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
      case ConnectorDirectionType.Left2Left:
        path = pathl2l;
        break;
      case ConnectorDirectionType.Right2Right:
        path = pathr2r;
        break;
      default:
        break;
    }
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path
          {...rest}
          d={path}
          stroke={stroke || DEFAULT_COLOR}
          strokeWidth={strokeWidth || 3}
          fill="transparent"
        />
        {endArrow && (
          <Arrow
            tip={coordinates.end}
            size={cArrowSize}
            rotateAngle={
              direction === ConnectorDirectionType.Right2Right ? 180 : 0
            }
            stroke={stroke || DEFAULT_COLOR}
          />
        )}
        {startArrow && (
          <Arrow
            tip={coordinates.start}
            size={cArrowSize}
            rotateAngle={
              direction === ConnectorDirectionType.Left2Left ? 0 : 180
            }
            stroke={stroke || DEFAULT_COLOR}
          />
        )}
      </svg>
    );
  }

  function corner43(direction?: ConnectorDirectionType) {
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
      case ConnectorDirectionType.Bottom2Bottom:
        path = pathb2b;
        break;
      case ConnectorDirectionType.Top2Top:
        path = patht2t;
        break;
      default:
        break;
    }
    return (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path
          {...rest}
          d={path}
          stroke={stroke || DEFAULT_COLOR}
          strokeWidth={strokeWidth || 3}
          fill="transparent"
        />
        {endArrow && (
          <Arrow
            tip={coordinates.end}
            size={cArrowSize}
            rotateAngle={
              direction === ConnectorDirectionType.Bottom2Bottom ? 270 : 90
            }
            stroke={stroke || DEFAULT_COLOR}
          />
        )}
        {startArrow && (
          <Arrow
            tip={coordinates.start}
            size={cArrowSize}
            rotateAngle={
              direction === ConnectorDirectionType.Top2Top ? 90 : 270
            }
            stroke={stroke || DEFAULT_COLOR}
          />
        )}
      </svg>
    );
  }

  if (narrowSDirection && isYSpaceDirections(narrowSDirection)) {
    if (distanceY >= 0) {
      return corner21(narrowSDirection);
    } else {
      return corner43(narrowSDirection);
    }
  }

  // corner 1 & 2
  if (distanceX >= 0) {
    return corner12(narrowSDirection);
  }

  // corner 4 & 3
  else {
    return corner34(narrowSDirection);
  }
}
