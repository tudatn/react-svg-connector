import React, { useEffect, useRef, useState } from "react";

interface Props {
  el1: HTMLDivElement;
  el2: HTMLDivElement;
  shape: "s" | "line" | "narrow-s";
  grids?: number;
  stem?: number;
  radius?: number;
}

export default function Connector(props: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  function getCoords(el: HTMLElement) {
    const parentEl = el.offsetParent;
    const box = el.getBoundingClientRect();

    return {
      top: box.top + window.pageYOffset + (parentEl?.scrollTop || 0),
      right: box.right + window.pageXOffset + (parentEl?.scrollLeft || 0),
      bottom: box.bottom + window.pageYOffset + (parentEl?.scrollTop || 0),
      left: box.left + window.pageXOffset + (parentEl?.scrollLeft || 0),
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

  if (!props.el1 || !props.el2) return null;

  const coordinates = getNewCoordinates();

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "absolute",
        top: 0,
        width: "100%",
        height: wrapperRef.current?.offsetParent?.scrollHeight || "100%",
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
  const distanceY = props.endY - props.startY;

  const multiplier = distanceX * distanceY;
  const directionFactor = multiplier !== 0 ? (multiplier > 0 ? 1 : -1) : 0;

  let stem = props.stem || 0;
  const grids = props.grids || 5;
  if (stem >= grids - 1) {
    stem = grids - 2;
  }
  const stepX = distanceX / grids;
  const stepY = distanceY / grids;

  const step = stepX;

  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <path
        d={`M
            ${props.startX} ${props.startY} 
            h ${Math.abs(step) * stem} 
            q ${Math.abs(step)} 0 
            ${Math.abs(step)} ${step * directionFactor}
            V ${props.endY - step * directionFactor}
            q ${0} ${step * directionFactor}
            ${step} ${step * directionFactor}
            H ${props.endX}
            `}
        stroke={props.stroke || "orange"}
        strokeWidth={props.strokeWidth || 3}
        fill="transparent"
      />
    </svg>
  );
}
