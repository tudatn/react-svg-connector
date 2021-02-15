import React, { useEffect, useRef, useState } from "react";
import NarrowSConnector from "./NarrowSConnector";
import LineConnector from "./LineConnector";
import SConnector from "./SConnector";

interface Props {
  el1: HTMLDivElement;
  el2: HTMLDivElement;
  shape: "s" | "line" | "narrow-s";
  grids?: number;
  stem?: number;
  radius?: number;
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
          radius={props.radius}
        />
      )}
    </div>
  );
}
