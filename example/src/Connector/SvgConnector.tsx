import React, { useRef } from "react";
import NarrowSConnector, { NarrowSConnectorProps } from "./NarrowSConnector";
import LineConnector, { LineConnectorProps } from "./LineConnector";
import SConnector, { SConectorProps } from "./SConnector";
import { getCoords } from "./interfaces/Point";
import { ConnectorDirectionType, ShapeType } from "./utils/Constants";
import { DistributiveOmit } from "./utils/Type";

export type ConnectorProps = DistributiveOmit<
  LineConnectorProps | SConectorProps | NarrowSConnectorProps,
  "startPoint" | "endPoint"
>;

export interface SvgConnectorProps {
  /** first element (HTML or React component) */
  el1: HTMLDivElement;
  /** second element (HTML or React component) */
  el2: HTMLDivElement;
  /** connector props for the given shape type */
  connectorProps: ConnectorProps;
}

export default function SvgConnector({
  el1,
  el2,
  connectorProps,
}: SvgConnectorProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  function getNewCoordinates() {
    const el1Coords = getCoords(el1);
    const el2Coords = getCoords(el2);

    const el1Dimesion = {
      width: el1Coords.right - el1Coords.left,
      height: el1Coords.bottom - el1Coords.top,
    };

    const el2Dimesion = {
      width: el2Coords.right - el2Coords.left,
      height: el2Coords.bottom - el2Coords.top,
    };

    let start = {
      x: el1Coords.right,
      y: el1Coords.top + el1Dimesion.height / 2,
    };

    let end = {
      x: el2Coords.left,
      y: el2Coords.top + el2Dimesion.height / 2,
    };

    switch (
      connectorProps.shape === ShapeType.NarrowS &&
      connectorProps.narrowSDirection
    ) {
      case ConnectorDirectionType.Left2Left:
        start.x = el1Coords.left;
        break;
      case ConnectorDirectionType.Left2Right:
        start.x = el1Coords.left;
        end.x = el2Coords.right;
        break;
      case ConnectorDirectionType.Right2Right:
        start.x = el1Coords.right;
        end.x = el2Coords.right;
        break;
      case ConnectorDirectionType.Bottom2Top:
        start = {
          x: el1Coords.left + el1Dimesion.width / 2,
          y: el1Coords.bottom,
        };
        end = {
          x: el2Coords.left + el2Dimesion.width / 2,
          y: el2Coords.top,
        };
        break;
      case ConnectorDirectionType.Bottom2Bottom:
        start = {
          x: el1Coords.left + el1Dimesion.width / 2,
          y: el1Coords.bottom,
        };
        end = {
          x: el2Coords.left + el2Dimesion.width / 2,
          y: el2Coords.bottom,
        };
        break;
      case ConnectorDirectionType.Top2Top:
        start = {
          x: el1Coords.left + el1Dimesion.width / 2,
          y: el1Coords.top,
        };
        end = {
          x: el2Coords.left + el2Dimesion.width / 2,
          y: el2Coords.top,
        };
        break;
      case ConnectorDirectionType.Top2Bottom:
        start = {
          x: el1Coords.left + el1Dimesion.width / 2,
          y: el1Coords.top,
        };
        end = {
          x: el2Coords.left + el2Dimesion.width / 2,
          y: el2Coords.bottom,
        };
        break;
      default:
        break;
    }

    return { start, end };
  }

  if (!el1 || !el2) return null;

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
      {connectorProps.shape === ShapeType.Line && (
        <LineConnector
          {...connectorProps}
          startPoint={coordinates.start}
          endPoint={coordinates.end}
        />
      )}
      {connectorProps.shape === ShapeType.S && (
        <SConnector
          {...connectorProps}
          startPoint={coordinates.start}
          endPoint={coordinates.end}
        />
      )}
      {connectorProps.shape === ShapeType.NarrowS && (
        <NarrowSConnector
          {...connectorProps}
          startPoint={coordinates.start}
          endPoint={coordinates.end}
        />
      )}
    </div>
  );
}
