import React from "react";
import Arrow from "./Arrow";
import { ShapeConnectorProps } from "./SvgConnector";

interface LineConnectorProps extends ShapeConnectorProps {}

export default function LineConnector(props: LineConnectorProps) {
  const deltaX = props.end.x - props.start.x;
  const deltaY = props.end.y - props.start.y;

  const alpha = Math.atan(deltaY / deltaX);

  let rotateAngle = (alpha * 180) / Math.PI;

  if (deltaX < 0) {
    rotateAngle = rotateAngle + 180;
  }

  const start = {
    x: props.start.x,
    y: props.start.y,
  };

  const end = {
    x: props.end.x,
    y: props.end.y,
  };

  const arrowSize =
    props.arrowSize || (props.strokeWidth ? props.strokeWidth * 3 : 10);

  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <line
        x1={props.start.x}
        x2={props.end.x}
        y1={props.start.y}
        y2={props.end.y}
        stroke={props.stroke || "orange"}
        strokeWidth={props.strokeWidth || 3}
      />
      {props.endArrow && (
        <Arrow
          tip={end}
          size={arrowSize}
          rotateAngle={rotateAngle}
          stroke={props.stroke || "orange"}
        />
      )}
      {props.startArrow && (
        <Arrow
          tip={start}
          size={arrowSize}
          rotateAngle={rotateAngle + 180}
          stroke={props.stroke || "orange"}
        />
      )}
    </svg>
  );
}
