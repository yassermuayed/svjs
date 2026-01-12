/**
 * An implementation of Ken Perlin's noise algorithm in 2D.
 *
 * With thanks to Joe Iddon. https://github.com/joeiddon/perlin
 */

interface Vector2D {
  x: number;
  y: number;
}

interface NoiseCache {
  [key: string]: number;
}

interface GradientCache {
  [key: string]: Vector2D;
}

export class Noise {
  private grad: GradientCache = {};
  private cache: NoiseCache = {};

  /**
   * Get the noise value at the specified coordinates.
   *
   * @param x - The noise x coordinate.
   * @param y - The noise y coordinate.
   * @returns The noise value (float between -1 and 1).
   */
  get(x: number, y: number = 0): number {
    const cacheKey = `${x},${y}`;

    if (this.cache[cacheKey] !== undefined) {
      return this.cache[cacheKey];
    }

    const xf = Math.floor(x);
    const yf = Math.floor(y);

    const tl = this.#gridDotProduct(x, y, xf, yf);
    const tr = this.#gridDotProduct(x, y, xf + 1, yf);
    const bl = this.#gridDotProduct(x, y, xf, yf + 1);
    const br = this.#gridDotProduct(x, y, xf + 1, yf + 1);

    const xt = this.#fade(x - xf, tl, tr);
    const xb = this.#fade(x - xf, bl, br);
    const v = this.#fade(y - yf, xt, xb);

    this.cache[cacheKey] = v;

    return v;
  }

  /**
   * Clear the noise cache.
   * Useful if you want to free memory or reset cached values.
   */
  clearCache(): void {
    this.cache = {};
  }

  /**
   * Clear the gradient cache.
   * This will generate new random gradients on subsequent get() calls.
   */
  clearGradients(): void {
    this.grad = {};
  }

  /**
   * Precompute gradients for a range of coordinates.
   * Can improve performance if you know the coordinate range in advance.
   *
   * @param xMin - Minimum x coordinate
   * @param xMax - Maximum x coordinate
   * @param yMin - Minimum y coordinate
   * @param yMax - Maximum y coordinate
   */
  precomputeGradients(
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number
  ): void {
    const xStart = Math.floor(xMin);
    const xEnd = Math.ceil(xMax);
    const yStart = Math.floor(yMin);
    const yEnd = Math.ceil(yMax);

    for (let x = xStart; x <= xEnd; x++) {
      for (let y = yStart; y <= yEnd; y++) {
        const key = `${x},${y}`;
        if (!this.grad[key]) {
          const th = Math.random() * 2 * Math.PI;
          this.grad[key] = {
            x: Math.cos(th),
            y: Math.sin(th),
          };
        }
      }
    }
  }

  #gridDotProduct(x: number, y: number, vx: number, vy: number): number {
    const dVec: Vector2D = { x: x - vx, y: y - vy };
    const gradKey = `${vx},${vy}`;

    let gVec: Vector2D;

    if (this.grad[gradKey]) {
      gVec = this.grad[gradKey];
    } else {
      const th = Math.random() * 2 * Math.PI;
      gVec = {
        x: Math.cos(th),
        y: Math.sin(th),
      };
      this.grad[gradKey] = gVec;
    }

    return dVec.x * gVec.x + dVec.y * gVec.y;
  }

  #fade(x: number, a: number, b: number): number {
    // Smoothstep function: 6x^5 - 15x^4 + 10x^3
    const s = x * x * x * (x * (x * 6 - 15) + 10);
    return a + s * (b - a);
  }
}
