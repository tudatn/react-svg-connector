import React from "react";
import { ShapeConnectorProps } from "./SvgConnector";

interface LineConnectorProps extends ShapeConnectorProps {}

export default function LineConnector(props: LineConnectorProps) {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <line
        x1={props.startX}
        x2={props.endX}
        y1={props.startY}
        y2={props.endY}
        stroke={props.stroke || "orange"}
        strokeWidth={props.strokeWidth || 3}
      />
    </svg>
  );
}
