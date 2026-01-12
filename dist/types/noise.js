/**
 * An implementation of Ken Perlin's noise algorithm in 2D.
 *
 * With thanks to Joe Iddon. https://github.com/joeiddon/perlin
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Noise_instances, _Noise_gridDotProduct, _Noise_fade;
export class Noise {
    constructor() {
        _Noise_instances.add(this);
        this.grad = {};
        this.cache = {};
    }
    /**
     * Get the noise value at the specified coordinates.
     *
     * @param x - The noise x coordinate.
     * @param y - The noise y coordinate.
     * @returns The noise value (float between -1 and 1).
     */
    get(x, y = 0) {
        const cacheKey = `${x},${y}`;
        if (this.cache[cacheKey] !== undefined) {
            return this.cache[cacheKey];
        }
        const xf = Math.floor(x);
        const yf = Math.floor(y);
        const tl = __classPrivateFieldGet(this, _Noise_instances, "m", _Noise_gridDotProduct).call(this, x, y, xf, yf);
        const tr = __classPrivateFieldGet(this, _Noise_instances, "m", _Noise_gridDotProduct).call(this, x, y, xf + 1, yf);
        const bl = __classPrivateFieldGet(this, _Noise_instances, "m", _Noise_gridDotProduct).call(this, x, y, xf, yf + 1);
        const br = __classPrivateFieldGet(this, _Noise_instances, "m", _Noise_gridDotProduct).call(this, x, y, xf + 1, yf + 1);
        const xt = __classPrivateFieldGet(this, _Noise_instances, "m", _Noise_fade).call(this, x - xf, tl, tr);
        const xb = __classPrivateFieldGet(this, _Noise_instances, "m", _Noise_fade).call(this, x - xf, bl, br);
        const v = __classPrivateFieldGet(this, _Noise_instances, "m", _Noise_fade).call(this, y - yf, xt, xb);
        this.cache[cacheKey] = v;
        return v;
    }
    /**
     * Clear the noise cache.
     * Useful if you want to free memory or reset cached values.
     */
    clearCache() {
        this.cache = {};
    }
    /**
     * Clear the gradient cache.
     * This will generate new random gradients on subsequent get() calls.
     */
    clearGradients() {
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
    precomputeGradients(xMin, xMax, yMin, yMax) {
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
}
_Noise_instances = new WeakSet(), _Noise_gridDotProduct = function _Noise_gridDotProduct(x, y, vx, vy) {
    const dVec = { x: x - vx, y: y - vy };
    const gradKey = `${vx},${vy}`;
    let gVec;
    if (this.grad[gradKey]) {
        gVec = this.grad[gradKey];
    }
    else {
        const th = Math.random() * 2 * Math.PI;
        gVec = {
            x: Math.cos(th),
            y: Math.sin(th),
        };
        this.grad[gradKey] = gVec;
    }
    return dVec.x * gVec.x + dVec.y * gVec.y;
}, _Noise_fade = function _Noise_fade(x, a, b) {
    // Smoothstep function: 6x^5 - 15x^4 + 10x^3
    const s = x * x * x * (x * (x * 6 - 15) + 10);
    return a + s * (b - a);
};
