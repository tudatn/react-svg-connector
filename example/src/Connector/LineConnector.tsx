import React from "react";
import Arrow from "./Arrow";
import { BaseShapeConnectorProps } from "./interfaces/Shape";
import {
  DEFAULT_COLOR,
  DEFAULT_STROKE_WIDTH,
  ShapeType,
} from "./utils/Constants";

export interface LineConnectorProps extends BaseShapeConnectorProps {
  shape: ShapeType.Line;
}

export default function LineConnector(props: LineConnectorProps) {
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

  const deltaX = endPoint.x - startPoint.x;
  const deltaY = endPoint.y - startPoint.y;

  const alpha = Math.atan(deltaY / deltaX);

  let rotateAngle = (alpha * 180) / Math.PI;

  if (deltaX < 0) {
    rotateAngle = rotateAngle + 180;
  }

  const cArrowSize =
    arrowSize || (strokeWidth ? strokeWidth * DEFAULT_STROKE_WIDTH : 10);

  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path
        {...rest}
        d={`M
            ${startPoint.x} ${startPoint.y}
            L
            ${endPoint.x} ${endPoint.y}
          `}
        stroke={stroke || DEFAULT_COLOR}
        strokeWidth={strokeWidth || DEFAULT_STROKE_WIDTH}
      />
      {endArrow && (
        <Arrow
          tip={endPoint}
          size={cArrowSize}
          rotateAngle={rotateAngle}
          stroke={stroke || DEFAULT_COLOR}
        />
      )}
      {startArrow && (
        <Arrow
          tip={startPoint}
          size={cArrowSize}
          rotateAngle={rotateAngle + 180}
          stroke={stroke || DEFAULT_COLOR}
        />
      )}
    </svg>
  );
}
