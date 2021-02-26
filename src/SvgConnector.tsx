import React, { useRef } from "react";
import NarrowSConnector from "./NarrowSConnector";
import LineConnector from "./LineConnector";
import SConnector from "./SConnector";

export type ShapeDirection =
  | "r2l"
  | "l2r"
  | "l2l"
  | "r2r"
  | "b2t"
  | "b2b"
  | "t2t"
  | "t2b";

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
  minStep?: number;
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
    const el1Coords = getCoords(props.el1);
    const el2Coords = getCoords(props.el2);

    const el1Dimesion = {
      width: el1Coords.right - el1Coords.left,
      height: el1Coords.bottom - el1Coords.top,
    };

    const el2Dimesion = {
      width: el2Coords.right - el2Coords.left,
      height: el2Coords.bottom - el2Coords.top,
    };

    let startX = el1Coords.right;
    let startY = el1Coords.top + el1Dimesion.height / 2;

    let endX = el2Coords.left;
    let endY = el2Coords.top + el2Dimesion.height / 2;

    switch (props.direction) {
      case "l2l":
        startX = el1Coords.left;
        break;
      case "l2r":
        startX = el1Coords.left;
        endX = el2Coords.right;
        break;
      case "r2r":
        startX = el1Coords.right;
        endX = el2Coords.right;
        break;
      case "b2t":
        startX = el1Coords.left + el1Dimesion.width / 2;
        startY = el1Coords.bottom;
        endX = el2Coords.left + el2Dimesion.width / 2;
        endY = el2Coords.top;
        break;
      case "b2b":
        startX = el1Coords.left + el1Dimesion.width / 2;
        startY = el1Coords.bottom;
        endX = el2Coords.left + el2Dimesion.width / 2;
        endY = el2Coords.bottom;
        break;
      case "t2t":
        startX = el1Coords.left + el1Dimesion.width / 2;
        startY = el1Coords.top;
        endX = el2Coords.left + el2Dimesion.width / 2;
        endY = el2Coords.top;
        break;
      case "t2b":
        startX = el1Coords.left + el1Dimesion.width / 2;
        startY = el1Coords.top;
        endX = el2Coords.left + el2Dimesion.width / 2;
        endY = el2Coords.bottom;
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
          minStep={props.minStep}
        />
      )}
    </div>
  );
}
