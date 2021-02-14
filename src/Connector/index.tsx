import React, { useEffect, useState } from "react";

interface Props {
  el1: HTMLDivElement;
  el2: HTMLDivElement;
  shape: "s" | "line" | "narrow-s";
  grids?: number;
  stem?: number;
  radius?: number;
}

export default function Connector(props: Props) {
  const [coordinates, setCoordinates] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });

  useEffect(() => {
    function getCoords(el: HTMLElement) {
      const box = el.getBoundingClientRect();

      return {
        top: box.top + window.pageYOffset,
        right: box.right + window.pageXOffset,
        bottom: box.bottom + window.pageYOffset,
        left: box.left + window.pageXOffset,
      };
    }

    function getNewCoordinates() {
      const startX = getCoords(props.el1).right;
      const startY =
        getCoords(props.el1).top +
        (getCoords(props.el1).bottom - getCoords(props.el1).top) / 2;

      const endX = getCoords(props.el2).left;
      const endY =
        getCoords(props.el2).top +
        (getCoords(props.el2).bottom - getCoords(props.el2).top) / 2;
      return { startX, startY, endX, endY };
    }

    function redraw() {
      setCoordinates(getNewCoordinates());
    }

    function cleanup() {
      window.removeEventListener("scroll", redraw);
      window.removeEventListener("resize", redraw);
    }

    window.addEventListener("scroll", redraw);
    window.addEventListener("resize", redraw);
    return () => {
      cleanup();
    };
  }, []);

  if (!props.el1 || !props.el2) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        width: "100%",
        height: document.documentElement.scrollHeight,
        zIndex: -1,
      }}
    >
      {props.shape === "line" && (
        <LineConnector
          startX={coordinates.startX}
          startY={coordinates.startY}
          endX={coordinates.endX}
          endY={coordinates.endY}
        />
      )}
      {props.shape === "s" && (
        <SConnector
          startX={coordinates.startX}
          startY={coordinates.startY}
          endX={coordinates.endX}
          endY={coordinates.endY}
        />
      )}
      {props.shape === "narrow-s" && (
        <NarrowSConnector
          startX={coordinates.startX}
          startY={coordinates.startY}
          endX={coordinates.endX}
          endY={coordinates.endY}
          stem={props.stem}
          grids={props.grids}
          radius={props.radius}
        />
      )}
    </div>
  );
}

interface ShapeConnectorProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  stroke?: string;
  strokeWidth?: number;
}

interface LineConnectorProps extends ShapeConnectorProps {}

export function LineConnector(props: LineConnectorProps) {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <line
        x1={props.startX}
        x2={props.endX}
        y1={props.startY}
        y2={props.endY}
        stroke={props.stroke || "orange"}
        stroke-width={props.strokeWidth || 3}
      />
    </svg>
  );
}

interface SConectorProps extends ShapeConnectorProps {}

export function SConnector(props: SConectorProps) {
  const distanceX = props.endX - props.startX;
  const distanceY = props.endY - props.startY;
  const grids = 4;
  const stepX = distanceX / grids;
  const stepY = distanceY / grids;

  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path
        d={`M
            ${props.startX} ${props.startY} 
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

interface NarrowSConnectorProps extends ShapeConnectorProps {
  grids?: number;
  stem?: number;
  radius?: number;
}

export function NarrowSConnector(props: NarrowSConnectorProps) {
  const distanceX = props.endX - props.startX;
  let stem = props.stem || 0;
  const grids = props.grids || 5;
  if (stem >= grids - 1) {
    stem = grids - 2;
  }
  const stepX = distanceX / grids;

  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path
        d={`M
            ${props.startX} ${props.startY} 
            h ${stepX * stem} 
            q ${stepX} 0 
            ${stepX} ${stepX}
            V ${props.endY - stepX}
            q ${0} ${stepX}
            ${stepX} ${stepX}
            H ${props.endX}
            `}
        stroke={props.stroke || "orange"}
        strokeWidth={props.strokeWidth || 3}
        fill="transparent"
      />
    </svg>
  );
}
