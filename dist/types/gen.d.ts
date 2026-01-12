/**
 * A collection of useful functions for generative art.
 */
export declare const Gen: {
    /**
     * Return true if the supplied % is higher than a randomised %.
     * If two arguments supplied, they are interpreted as odds.
     *
     * @param n1 - The chance of the return value being true. 50 by default.
     * @param n2 - If not undefined, both arguments are interpreted as odds in the form n1 to n2.
     * @returns true or false.
     */
    readonly chance: (n1?: number, n2?: number) => boolean;
    /**
     * Constrains (or clamps) a value between a minimum and maximum value.
     *
     * @param num - The number to constrain.
     * @param min - The minimum limit.
     * @param max - The maximum limit.
     * @returns The constrained number.
     */
    readonly constrain: (num: number, min: number, max: number) => number;
    /**
     * Calculates the distance between two points using the Pythagorean theorem.
     *
     * @param x1 - The first x coordinate.
     * @param y1 - The first y coordinate.
     * @param x2 - The second x coordinate.
     * @param y2 - The second y coordinate.
     * @returns The distance between (x1, y1) and (x2, y2).
     */
    readonly dist: (x1: number, y1: number, x2: number, y2: number) => number;
    /**
     * Gets a random number based on the Box-Muller gaussian transform.
     * By default, it typically returns results within a range of -3 to +3.
     *
     * @param mean - The mean, 0 by default.
     * @param sigma - Sigma refers to the standard deviation, 1 by default.
     * @param float - Set to false to return an integer.
     * @returns The random gaussian.
     */
    readonly gaussian: (mean?: number, sigma?: number, float?: boolean) => number;
    /**
     * Interpolates linearly between two values. Returns the midway point (0.5) by default.
     *
     * @param start - The first value.
     * @param stop - The second value.
     * @param amount - The amount of interpolation, between 0.0 and 1.0.
     * @returns The interpolated value.
     */
    readonly interp: (start: number, stop: number, amount?: number) => number;
    /**
     * Re-maps a number from one range to another.
     *
     * @param value - The value to be converted.
     * @param start1 - The lower bound of the current range.
     * @param stop1 - The upper bound of the current range.
     * @param start2 - The lower bound of the target range.
     * @param stop2 - The upper bound of the target range.
     * @param float - Set to false to return an integer.
     * @returns The remapped number.
     */
    readonly map: (value: number, start1: number, stop1: number, start2: number, stop2: number, float?: boolean) => number;
    /**
     * Gets a random number based on the pareto power law distribution (80-20 rule).
     *
     * @param min - The minimum value to be returned.
     * @param float - Set to false to return an integer.
     * @returns The random pareto number.
     */
    readonly pareto: (min: number, float?: boolean) => number;
    /**
     * Gets a random number between a minimum and maximum value,
     * or picks a random item from an array.
     *
     * Overloaded method signature.
     */
    /**
     * Gets a random number between a minimum and maximum value,
     * or picks a random item from an array.
     */
    readonly random: (arg1: number | any[], arg2?: number, arg3?: boolean) => number | any;
};
//# sourceMappingURL=gen.d.ts.map