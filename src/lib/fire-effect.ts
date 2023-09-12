(window as any).__OPTMIZE_PERFORMANCE = false;

export class Particle {
  x: any;
  y: any;
  xs: any;
  ys: any;
  life: number;

  constructor(x, y, xs, ys) {
    this.x = x;
    this.y = y;
    this.xs = xs;
    this.ys = ys;
    this.life = 0;
  }
}

export function drawFireEffect(ctx: CanvasRenderingContext2D, fireAnchorX: number, fireAnchorY: number, size: number, maxAge: number, particles: Particle[]) {
  let opCache = ctx.globalCompositeOperation;
  ctx.globalCompositeOperation = "lighter";

  const speed = 1;
  let spawnCount = 10;

  if ((window as any).__OPTMIZE_PERFORMANCE) {
    maxAge /= 2;
    spawnCount = 2;
  }

  for (let i = 0; i < spawnCount; i++) {
    //Adds a particle at the mouse position, with random horizontal and vertical speeds
    let p = new Particle(fireAnchorX, fireAnchorY, (Math.random() * 2 * speed - speed) / 2, 0 - Math.random() * 2 * speed);
    particles.push(p);
  }

  //Cycle through all the particles to draw them
  for (let i = 0; i < particles.length; i++) {
    //Set the file colour to an RGBA value where it starts off red-orange, but progressively gets more grey and transparent the longer the particle has been alive for
    ctx.fillStyle =
      "rgba(" +
      (260 - particles[i].life * 2) +
      "," +
      (particles[i].life * 2 + 50) +
      "," +
      particles[i].life * 2 +
      "," +
      ((maxAge - particles[i].life) / maxAge) * 0.4 +
      ")";

    ctx.beginPath();
    //Draw the particle as a circle, which gets slightly smaller the longer it's been alive for
    ctx.arc(particles[i].x, particles[i].y, Math.max(0,((maxAge - particles[i].life) / maxAge) * (size / 2) + size / 2), 0, 2 * Math.PI);
    ctx.fill();

    //Move the particle based on its horizontal and vertical speeds
    particles[i].x += particles[i].xs;
    particles[i].y += particles[i].ys;

    particles[i].life++;
    //If the particle has lived longer than we are allowing, remove it from the array.
    if (particles[i].life >= maxAge) {
      particles.splice(i, 1);
      i--;
    }
  }

  ctx.globalCompositeOperation = opCache;
}
