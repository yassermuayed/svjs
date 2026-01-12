/**
 * A collection of useful functions for generative art.
 */
export const Gen = {
    /**
     * Return true if the supplied % is higher than a randomised %.
     * If two arguments supplied, they are interpreted as odds.
     *
     * @param n1 - The chance of the return value being true. 50 by default.
     * @param n2 - If not undefined, both arguments are interpreted as odds in the form n1 to n2.
     * @returns true or false.
     */
    chance(n1 = 50, n2) {
        const n = n2 !== undefined ? (n2 / (n1 + n2)) * 100 : n1;
        return n > Math.random() * 100;
    },
    /**
     * Constrains (or clamps) a value between a minimum and maximum value.
     *
     * @param num - The number to constrain.
     * @param min - The minimum limit.
     * @param max - The maximum limit.
     * @returns The constrained number.
     */
    constrain(num, min, max) {
        return Math.min(Math.max(num, min), max);
    },
    /**
     * Calculates the distance between two points using the Pythagorean theorem.
     *
     * @param x1 - The first x coordinate.
     * @param y1 - The first y coordinate.
     * @param x2 - The second x coordinate.
     * @param y2 - The second y coordinate.
     * @returns The distance between (x1, y1) and (x2, y2).
     */
    dist(x1, y1, x2, y2) {
        const a = x1 - x2;
        const b = y1 - y2;
        return Math.sqrt(a * a + b * b);
    },
    /**
     * Gets a random number based on the Box-Muller gaussian transform.
     * By default, it typically returns results within a range of -3 to +3.
     *
     * @param mean - The mean, 0 by default.
     * @param sigma - Sigma refers to the standard deviation, 1 by default.
     * @param float - Set to false to return an integer.
     * @returns The random gaussian.
     */
    gaussian(mean = 0, sigma = 1, float = true) {
        const u = 1 - Math.random();
        const v = Math.random();
        const z = Math.cos(Math.PI * v) * Math.sqrt(-Math.log(u));
        const g = z * sigma + mean;
        return float ? g : Math.round(g);
    },
    /**
     * Interpolates linearly between two values. Returns the midway point (0.5) by default.
     *
     * @param start - The first value.
     * @param stop - The second value.
     * @param amount - The amount of interpolation, between 0.0 and 1.0.
     * @returns The interpolated value.
     */
    interp(start, stop, amount = 0.5) {
        return amount * (stop - start) + start;
    },
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
    map(value, start1, stop1, start2, stop2, float = true) {
        const n = ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
        return float ? n : Math.round(n);
    },
    /**
     * Gets a random number based on the pareto power law distribution (80-20 rule).
     *
     * @param min - The minimum value to be returned.
     * @param float - Set to false to return an integer.
     * @returns The random pareto number.
     */
    pareto(min, float = true) {
        const n = 1.0 - Math.random();
        const a = Math.log(5) / Math.log(4);
        const p = min / Math.pow(n, 1.0 / a);
        return float ? p : Math.round(p);
    },
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
    random(arg1, arg2, arg3) {
        if (Array.isArray(arg1)) {
            const arr = arg1;
            return arr[Math.round(Math.random() * (arr.length - 1))];
        }
        else {
            const min = arg1;
            const max = arg2 !== undefined ? arg2 : 1;
            const float = arg3 !== undefined ? arg3 : false;
            const random = Math.random() * (max - min) + min;
            return float || max - min <= 1 ? random : Math.round(random);
        }
    },
};
