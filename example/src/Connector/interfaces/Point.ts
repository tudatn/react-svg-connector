/** Canvas point */
export interface Point {
  x: number;
  y: number;
}

/** Get coordinates of HTML element */
export function getCoords(el: HTMLElement) {
  const parentEl = el.offsetParent;
  const box = el.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset + (parentEl?.scrollTop || 0),
    right: box.right + window.pageXOffset + (parentEl?.scrollLeft || 0),
    bottom: box.bottom + window.pageYOffset + (parentEl?.scrollTop || 0),
    left: box.left + window.pageXOffset + (parentEl?.scrollLeft || 0),
  };
}
