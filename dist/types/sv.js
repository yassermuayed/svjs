var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SvJs_instances, _a, _SvJs_addTransform, _SvJs_createTransform, _SvJs_defsCheck, _SvJs_isMainSVG, _SvJs_isValid;
/**
 * A class to instantiate and manipulate SVG elements with a chainable API.
 */
export class SvJs {
    /**
     * Create an SVG element.
     *
     * @param element - The name of the SVG element to create.
     * @param namespace - The namespace URL to reference.
     * @throws {Error} If the created element is not a valid SVG element.
     */
    constructor(element = "svg", namespace = "http://www.w3.org/2000/svg") {
        _SvJs_instances.add(this);
        /** @type {number|null} */
        this.cursorX = null;
        /** @type {number|null} */
        this.cursorY = null;
        /** @type {SvJs|null} */
        this.child = null;
        this.element = document.createElementNS(namespace, element);
        __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_isValid).call(this);
        if (this.element.nodeName === "svg") {
            this.element.setAttribute("xmlns", namespace);
        }
    }
    addEventListener(type, callback, options) {
        this.element.addEventListener(type, callback, options);
        return this;
    }
    /**
     * Add the SVG element to the specified node.
     *
     * @chainable
     * @param node - A HTML or SVG parent node.
     * @returns itself.
     */
    addTo(node) {
        node.appendChild(this.element);
        return this;
    }
    /**
     * Animate an element using the Web Animations API.
     *
     * @chainable
     * @param keyframes - An array of keyframe objects, or an object of keyframe arrays.
     * @param options - A single duration, or an object containing timing properties.
     * @returns itself.
     */
    animate(keyframes, options) {
        this.element.animate(keyframes, options);
        return this;
    }
    /**
     * Inserts content within an element. Useful for textual elements.
     *
     * @chainable
     * @param text - The content to insert.
     * @returns itself.
     */
    content(text) {
        this.element.innerHTML = text;
        return this;
    }
    /**
     * Create and append an SVG child element.
     *
     * @chainable
     * @param element - The name of the SVG element to create.
     * @returns The created SVG child element.
     */
    create(element) {
        this.child = new _a(element);
        if (element === "defs") {
            const defs = __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_defsCheck).call(this);
            if (this.child) {
                this.child.element = defs;
            }
        }
        else {
            if (this.child) {
                this.element.appendChild(this.child.element);
            }
        }
        return this.child;
    }
    /**
     * Creates a smooth, open bezier curve from an array of points.
     *
     * @chainable
     * @param points - A two-dimensional array of [[x,y], [x,y]...] points.
     * @param curveFactor - 0 means that points are connected by straight lines. Default is 1.
     * @returns The created path element.
     */
    createCurve(points, curveFactor = 1) {
        const path = new _a("path");
        const flattened = points.flat();
        let pathData = `M ${[flattened[0], flattened[1]]}`;
        for (let i = 0; i < flattened.length - 2; i += 2) {
            const x0 = i ? flattened[i - 2] : flattened[0];
            const y0 = i ? flattened[i - 1] : flattened[1];
            const x1 = flattened[i];
            const y1 = flattened[i + 1];
            const x2 = flattened[i + 2];
            const y2 = flattened[i + 3];
            const x3 = i !== flattened.length - 4 ? flattened[i + 4] : x2;
            const y3 = i !== flattened.length - 4 ? flattened[i + 5] : y2;
            const cp1x = x1 + ((x2 - x0) / 6) * curveFactor;
            const cp1y = y1 + ((y2 - y0) / 6) * curveFactor;
            const cp2x = x2 - ((x3 - x1) / 6) * curveFactor;
            const cp2y = y2 - ((y3 - y1) / 6) * curveFactor;
            pathData += `C ${[cp1x, cp1y, cp2x, cp2y, x2, y2]}`;
        }
        path.set({
            d: pathData,
            stroke: "#888",
            fill: "none",
        });
        this.element.appendChild(path.element);
        return path;
    }
    /**
     * Creates a filter and appends it to the defs element.
     *
     * @chainable
     * @param id - The id. Reference this when applying the filter.
     * @returns The created filter element.
     * @throws {Error} If called on a non-main SVG element.
     */
    createFilter(id) {
        __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_isMainSVG).call(this);
        const filter = new _a("filter");
        filter.set({
            id: id,
            x: "-25%",
            y: "-25%",
            width: "150%",
            height: "150%",
            filterUnits: "userSpaceOnUse",
            color_interpolation_filters: "sRGB",
        });
        const defs = __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_defsCheck).call(this);
        defs.appendChild(filter.element);
        return filter;
    }
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
    createGradient(id, type, colours, rotation = 45) {
        __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_isMainSVG).call(this);
        const gradient = new _a(`${type}Gradient`);
        gradient.set({ id: id });
        if (type === "linear") {
            gradient.set({ gradientTransform: `rotate(${rotation})` });
        }
        for (let i = 0; i < colours.length; i += 1) {
            if (gradient.child) {
                gradient.child.set({
                    stop_color: colours[i],
                    offset: (i * (100 / (colours.length - 1))) / 100,
                });
            }
        }
        const defs = __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_defsCheck).call(this);
        defs.appendChild(gradient.element);
        return gradient;
    }
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
    createPattern(id, width, height) {
        __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_isMainSVG).call(this);
        const pattern = new _a("pattern");
        pattern.set({
            id: id,
            x: 0,
            y: 0,
            width: width,
            height: height,
            patternUnits: "userSpaceOnUse",
        });
        const defs = __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_defsCheck).call(this);
        defs.appendChild(pattern.element);
        return pattern;
    }
    /**
     * Delete the SVG element.
     */
    delete() {
        this.element.remove();
    }
    /**
     * Get a given attribute's value.
     *
     * @param attribute - The attribute name.
     * @returns The attribute value or null.
     */
    get(attribute) {
        return this.element.getAttribute(attribute);
    }
    /**
     * Get a given element's centre { x, y } coordinates.
     *
     * @returns The centre.x and centre.y coordinates.
     */
    getCentre() {
        // Cast to SVGGraphicsElement which has getBBox()
        const graphicsElement = this.element;
        const bbox = graphicsElement.getBBox();
        const cx = bbox.x + bbox.width / 2;
        const cy = bbox.y + bbox.height / 2;
        return { x: cx, y: cy };
    }
    /**
     * Move an element to a desired position with respect to its centre.
     *
     * @chainable
     * @param x - The target x coordinate.
     * @param y - The target y coordinate.
     * @returns itself.
     */
    moveTo(x, y) {
        const c = this.getCentre();
        const t = __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_createTransform).call(this);
        t.setTranslate(x - c.x, y - c.y);
        __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_addTransform).call(this, t);
        return this;
    }
    /**
     * Rotate an element around a specified origin point (the element centre by default).
     *
     * @chainable
     * @param angle - The angle of rotation.
     * @param cx - The origin x coordinate.
     * @param cy - The origin y coordinate.
     * @returns itself.
     */
    rotate(angle, cx, cy) {
        const c = this.getCentre();
        const t = __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_createTransform).call(this);
        const originX = cx ?? c.x;
        const originY = cy ?? c.y;
        t.setRotate(angle, originX, originY);
        __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_addTransform).call(this, t);
        return this;
    }
    /**
     * Saves and downloads the SVG markup.
     */
    save() {
        const name = prompt("Enter the file name", "sketch.svg");
        if (name !== null) {
            const a = document.createElement("a");
            a.download = name;
            const data = this.element.outerHTML;
            const file = new Blob([data], { type: "text/plain;charset=utf-8" });
            a.href = URL.createObjectURL(file);
            a.click();
            URL.revokeObjectURL(a.href);
        }
    }
    /**
     * Scale an element by a desired proportion.
     *
     * @chainable
     * @param sx - The amount to scale on the x-axis.
     * @param sy - The amount to scale on the y-axis. Defaults to sx if not supplied.
     * @returns itself.
     */
    scale(sx, sy) {
        const c = this.getCentre();
        const t1 = __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_createTransform).call(this);
        const t2 = __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_createTransform).call(this);
        const scaleY = sy ?? sx;
        t1.setTranslate((1 - sx) * c.x, (1 - scaleY) * c.y);
        t2.setScale(sx, scaleY);
        __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_addTransform).call(this, t1);
        __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_addTransform).call(this, t2);
        return this;
    }
    /**
     * Set the attribute values of an SVG element. Replaces _ with - for relevant attributes.
     *
     * @chainable
     * @param attributes - An object of attribute-value pairs.
     * @returns itself.
     */
    set(attributes) {
        for (const [key, value] of Object.entries(attributes)) {
            const prop = key.replace(/_/g, "-");
            this.element.setAttribute(prop, String(value));
        }
        return this;
    }
    /**
     * Update the cursorX and cursorY properties on the main SVG element.
     * Accurate cursor tracking via matrix transformation. Compatible with touch devices.
     *
     * @chainable
     * @param callback - An optional callback function to trigger whenever the cursor moves.
     * @returns itself.
     * @throws {Error} If called on a non-main SVG element.
     */
    trackCursor(callback = null) {
        __classPrivateFieldGet(this, _SvJs_instances, "m", _SvJs_isMainSVG).call(this);
        let point = new DOMPoint();
        this.element.addEventListener("pointermove", (event) => {
            this.element.style.touchAction = "none";
            const e = event;
            point.x = e.clientX;
            point.y = e.clientY;
            // Cast to SVGSVGElement for getScreenCTM
            const svgElement = this.element;
            const ctm = svgElement.getScreenCTM();
            if (ctm) {
                point = point.matrixTransform(ctm.inverse());
                this.cursorX = Math.ceil(point.x);
                this.cursorY = Math.ceil(point.y);
            }
        });
        this.element.addEventListener("pointerleave", () => {
            this.element.style.touchAction = "auto";
        });
        if (callback !== null) {
            this.element.addEventListener("pointermove", callback);
        }
        return this;
    }
}
_a = SvJs, _SvJs_instances = new WeakSet(), _SvJs_addTransform = function _SvJs_addTransform(transform) {
    // Cast to SVGGraphicsElement which has transform property
    const graphicsElement = this.element;
    const transformList = graphicsElement.transform.baseVal;
    transformList.appendItem(transform);
}, _SvJs_createTransform = function _SvJs_createTransform() {
    const root = new _a();
    // Create a temporary SVG element for transform creation
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    return svg.createSVGTransform();
}, _SvJs_defsCheck = function _SvJs_defsCheck() {
    let defs;
    const existingDefs = document.querySelector("defs");
    if (existingDefs) {
        defs = existingDefs;
    }
    else {
        const newDefs = new _a("defs");
        defs = newDefs.element;
        this.element.prepend(defs);
    }
    return defs;
}, _SvJs_isMainSVG = function _SvJs_isMainSVG() {
    if (this.element.nodeName !== "svg") {
        throw new Error("This function can only be called on the main SVG element.");
    }
}, _SvJs_isValid = function _SvJs_isValid() {
    const elementToString = Object.prototype.toString
        .call(this.element)
        .toLowerCase();
    if (elementToString !==
        `[object svg${this.element.nodeName.toLowerCase()}element]`) {
        throw new Error(`Invalid SVG element: ${this.element.nodeName}`);
    }
};
