import { ConnectorDirectionType } from "./Constants";

/** Check if the connector direction is within y space */
export function isYSpaceDirections(direction: ConnectorDirectionType): boolean {
  const ySpaceDirections = ["b2t", "b2b", "t2t", "t2b"];
  return ySpaceDirections.includes(direction);
}
