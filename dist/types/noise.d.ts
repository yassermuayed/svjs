/**
 * An implementation of Ken Perlin's noise algorithm in 2D.
 *
 * With thanks to Joe Iddon. https://github.com/joeiddon/perlin
 */
export declare class Noise {
    #private;
    private grad;
    private cache;
    /**
     * Get the noise value at the specified coordinates.
     *
     * @param x - The noise x coordinate.
     * @param y - The noise y coordinate.
     * @returns The noise value (float between -1 and 1).
     */
    get(x: number, y?: number): number;
    /**
     * Clear the noise cache.
     * Useful if you want to free memory or reset cached values.
     */
    clearCache(): void;
    /**
     * Clear the gradient cache.
     * This will generate new random gradients on subsequent get() calls.
     */
    clearGradients(): void;
    /**
     * Precompute gradients for a range of coordinates.
     * Can improve performance if you know the coordinate range in advance.
     *
     * @param xMin - Minimum x coordinate
     * @param xMax - Maximum x coordinate
     * @param yMin - Minimum y coordinate
     * @param yMax - Maximum y coordinate
     */
    precomputeGradients(xMin: number, xMax: number, yMin: number, yMax: number): void;
}
//# sourceMappingURL=noise.d.ts.map