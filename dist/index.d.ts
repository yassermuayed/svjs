/**
 * A class to instantiate and manipulate SVG elements with a chainable API.
 */
export class SvJs {
    #private;
    /** @type {SVGElement | SVGSVGElement | SVGPathElement | SVGGradientElement | SVGPatternElement | SVGFilterElement} */
    element: SVGElement;
    /** @type {number|null} */
    cursorX: number | null;
    /** @type {number|null} */
    cursorY: number | null;
    /** @type {SvJs|null} */
    child: SvJs | null;
    /**
     * Create an SVG element.
     *
     * @param element - The name of the SVG element to create.
     * @param namespace - The namespace URL to reference.
     * @throws {Error} If the created element is not a valid SVG element.
     */
    constructor(element?: keyof SVGElementTagNameMap | string, namespace?: string);
    /**
     * An alias of the DOM addEventListener method.
     *
     * @chainable
     * @param type - The event type.
     * @param callback - The callback function.
     * @returns itself.
     */
    addEventListener<K extends keyof SVGElementEventMap>(type: K, callback: (this: SVGElement, ev: SVGElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): this;
    /**
     * Add the SVG element to the specified node.
     *
     * @chainable
     * @param node - A HTML or SVG parent node.
     * @returns itself.
     */
    addTo(node: Node): this;
    /**
     * Animate an element using the Web Animations API.
     *
     * @chainable
     * @param keyframes - An array of keyframe objects, or an object of keyframe arrays.
     * @param options - A single duration, or an object containing timing properties.
     * @returns itself.
     */
    animate(keyframes: Keyframe[] | PropertyIndexedKeyframes, options: number | KeyframeAnimationOptions): this;
    /**
     * Inserts content within an element. Useful for textual elements.
     *
     * @chainable
     * @param text - The content to insert.
     * @returns itself.
     */
    content(text: string): this;
    /**
     * Create and append an SVG child element.
     *
     * @chainable
     * @param element - The name of the SVG element to create.
     * @returns The created SVG child element.
     */
    create<T extends keyof SVGElementTagNameMap>(element: T): SvJs & {
        element: SVGElementTagNameMap[T];
    };
    /**
     * Creates a smooth, open bezier curve from an array of points.
     *
     * @chainable
     * @param points - A two-dimensional array of [[x,y], [x,y]...] points.
     * @param curveFactor - 0 means that points are connected by straight lines. Default is 1.
     * @returns The created path element.
     */
    createCurve(points: [number, number][], curveFactor?: number): SvJs;
    /**
     * Creates a filter and appends it to the defs element.
     *
     * @chainable
     * @param id - The id. Reference this when applying the filter.
     * @returns The created filter element.
     * @throws {Error} If called on a non-main SVG element.
     */
    createFilter(id: string): SvJs;
    /**
     * Creates a gradient and appends it to the defs element.
     *
     * @chainable
     * @param id - The id. Reference this when applying the gradient.
     * @param type - Accepts 'linear' or 'radial'.
     * @param colours - An array of gradient colours to be applied equidistantly.
     * @param rotation - The angle of rotation. Ignored if gradient is radial.
     * @returns The created gradient element.
     * @throws {Error} If called on a non-main SVG element.
     */
    createGradient(id: string, type: "linear" | "radial", colours: string[], rotation?: number): SvJs;
    /**
     * Creates a pattern and appends it to the defs element.
     *
     * @chainable
     * @param id - The id. Reference this when applying the gradient.
     * @param width - The width of the pattern.
     * @param height - The height of the pattern.
     * @returns The created pattern element.
     * @throws {Error} If called on a non-main SVG element.
     */
    createPattern(id: string, width: number, height: number): SvJs;
    /**
     * Delete the SVG element.
     */
    delete(): void;
    /**
     * Get a given attribute's value.
     *
     * @param attribute - The attribute name.
     * @returns The attribute value or null.
     */
    get(attribute: string): string | null;
    /**
     * Get a given element's centre { x, y } coordinates.
     *
     * @returns The centre.x and centre.y coordinates.
     */
    getCentre(): {
        x: number;
        y: number;
    };
    /**
     * Move an element to a desired position with respect to its centre.
     *
     * @chainable
     * @param x - The target x coordinate.
     * @param y - The target y coordinate.
     * @returns itself.
     */
    moveTo(x: number, y: number): this;
    /**
     * Rotate an element around a specified origin point (the element centre by default).
     *
     * @chainable
     * @param angle - The angle of rotation.
     * @param cx - The origin x coordinate.
     * @param cy - The origin y coordinate.
     * @returns itself.
     */
    rotate(angle: number, cx?: number, cy?: number): this;
    /**
     * Saves and downloads the SVG markup.
     */
    save(): void;
    /**
     * Scale an element by a desired proportion.
     *
     * @chainable
     * @param sx - The amount to scale on the x-axis.
     * @param sy - The amount to scale on the y-axis. Defaults to sx if not supplied.
     * @returns itself.
     */
    scale(sx: number, sy?: number): this;
    /**
     * Set the attribute values of an SVG element. Replaces _ with - for relevant attributes.
     *
     * @chainable
     * @param attributes - An object of attribute-value pairs.
     * @returns itself.
     */
    set(attributes: Record<string, string | number>): this;
    /**
     * Update the cursorX and cursorY properties on the main SVG element.
     * Accurate cursor tracking via matrix transformation. Compatible with touch devices.
     *
     * @chainable
     * @param callback - An optional callback function to trigger whenever the cursor moves.
     * @returns itself.
     * @throws {Error} If called on a non-main SVG element.
     */
    trackCursor(callback?: EventListener | null): this;
}
/**
 * A collection of useful functions for generative art.
 */
export const Gen: {
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
export class Noise {
    #private;
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

//# sourceMappingURL=index.d.ts.map
