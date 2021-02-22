import React, { useRef } from "react";
import NarrowSConnector from "./NarrowSConnector";
import LineConnector from "./LineConnector";
import SConnector from "./SConnector";

export type ShapeDirection = "r2l" | "l2r" | "l2l" | "r2r";

interface Props {
  el1: HTMLDivElement;
  el2: HTMLDivElement;
  shape: "s" | "line" | "narrow-s";
  direction?: ShapeDirection;
  grids?: number;
  stem?: number;
  roundCorner?: boolean;
  stroke?: string;
  strokeWidth?: number;
}

export interface ShapeConnectorProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  stroke?: string;
  strokeWidth?: number;
}

export default function SvgConnector(props: Props) {
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
    let startX = getCoords(props.el1).right;
    let startY =
      getCoords(props.el1).top +
      (getCoords(props.el1).bottom - getCoords(props.el1).top) / 2;

    let endX = getCoords(props.el2).left;
    let endY =
      getCoords(props.el2).top +
      (getCoords(props.el2).bottom - getCoords(props.el2).top) / 2;

    switch (props.direction) {
      case "l2l":
        startX = getCoords(props.el1).left;
        break;
      case "l2r":
        startX = getCoords(props.el1).left;
        endX = getCoords(props.el2).right;
        break;
      case "r2r":
        startX = getCoords(props.el1).right;
        endX = getCoords(props.el2).right;
        break;
      default:
        break;
    }

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
        width: wrapperRef.current?.offsetParent?.scrollWidth || "100%",
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
          stroke={props.stroke}
          strokeWidth={props.strokeWidth}
        />
      )}
      {props.shape === "s" && (
        <SConnector
          startX={coordinates.startX}
          startY={coordinates.startY}
          endX={coordinates.endX}
          stroke={props.stroke}
          strokeWidth={props.strokeWidth}
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
          stroke={props.stroke}
          strokeWidth={props.strokeWidth}
          roundCorner={props.roundCorner}
          direction={props.direction}
        />
      )}
    </div>
  );
}
