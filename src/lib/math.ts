export function doCirclesCollide(c1x: number, c1y: number, r1: number, c2x: number, c2y: number, r2: number) {
  var a;
  var x;
  var y;

  a = r1 + r2;
  x = c1x - c2x;
  y = c1y - c2y;

  return a > Math.sqrt(x * x + y * y);
}
