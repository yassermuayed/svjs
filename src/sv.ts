/**
 * A class to instantiate and manipulate SVG elements with a chainable API.
 */
export class SvJs {
  /** @type {SVGElement | SVGSVGElement | SVGPathElement | SVGGradientElement | SVGPatternElement | SVGFilterElement} */
  element: SVGElement;

  /** @type {number|null} */
  cursorX: number | null = null;

  /** @type {number|null} */
  cursorY: number | null = null;

  /** @type {SvJs|null} */
  child: SvJs | null = null;

  /**
   * Create an SVG element.
   *
   * @param element - The name of the SVG element to create.
   * @param namespace - The namespace URL to reference.
   * @throws {Error} If the created element is not a valid SVG element.
   */
  constructor(
    element: keyof SVGElementTagNameMap | string = "svg",
    namespace: string = "http://www.w3.org/2000/svg"
  ) {
    this.element = document.createElementNS(namespace, element) as SVGElement;

    this.#isValid();

    if (this.element.nodeName === "svg") {
      this.element.setAttribute("xmlns", namespace);
    }
  }

  /**
   * An alias of the DOM addEventListener method.
   *
   * @chainable
   * @param type - The event type.
   * @param callback - The callback function.
   * @returns itself.
   */
  addEventListener<K extends keyof SVGElementEventMap>(
    type: K,
    callback: (this: SVGElement, ev: SVGElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): this;
  addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): this {
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
  addTo(node: Node): this {
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
  animate(
    keyframes: Keyframe[] | PropertyIndexedKeyframes,
    options: number | KeyframeAnimationOptions
  ): this {
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
  content(text: string): this {
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
  create<T extends keyof SVGElementTagNameMap>(
    element: T
  ): SvJs & { element: SVGElementTagNameMap[T] } {
    this.child = new SvJs(element) as any;

    if (element === "defs") {
      const defs = this.#defsCheck();
      if (this.child) {
        this.child.element = defs as any;
      }
    } else {
      if (this.child) {
        this.element.appendChild(this.child.element);
      }
    }

    return this.child as any;
  }

  /**
   * Creates a smooth, open bezier curve from an array of points.
   *
   * @chainable
   * @param points - A two-dimensional array of [[x,y], [x,y]...] points.
   * @param curveFactor - 0 means that points are connected by straight lines. Default is 1.
   * @returns The created path element.
   */
  createCurve(points: [number, number][], curveFactor: number = 1): SvJs {
    const path = new SvJs("path");
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
  createFilter(id: string): SvJs {
    this.#isMainSVG();

    const filter = new SvJs("filter");
    filter.set({
      id: id,
      x: "-25%",
      y: "-25%",
      width: "150%",
      height: "150%",
      filterUnits: "userSpaceOnUse",
      color_interpolation_filters: "sRGB",
    });

    const defs = this.#defsCheck();
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
  createGradient(
    id: string,
    type: "linear" | "radial",
    colours: string[],
    rotation: number = 45
  ): SvJs {
    this.#isMainSVG();

    const gradient = new SvJs(`${type}Gradient`);
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

    const defs = this.#defsCheck();
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
  createPattern(id: string, width: number, height: number): SvJs {
    this.#isMainSVG();

    const pattern = new SvJs("pattern");
    pattern.set({
      id: id,
      x: 0,
      y: 0,
      width: width,
      height: height,
      patternUnits: "userSpaceOnUse",
    });

    const defs = this.#defsCheck();
    defs.appendChild(pattern.element);

    return pattern;
  }

  /**
   * Delete the SVG element.
   */
  delete(): void {
    this.element.remove();
  }

  /**
   * Get a given attribute's value.
   *
   * @param attribute - The attribute name.
   * @returns The attribute value or null.
   */
  get(attribute: string): string | null {
    return this.element.getAttribute(attribute);
  }

  /**
   * Get a given element's centre { x, y } coordinates.
   *
   * @returns The centre.x and centre.y coordinates.
   */
  getCentre(): { x: number; y: number } {
    // Cast to SVGGraphicsElement which has getBBox()
    const graphicsElement = this.element as unknown as SVGGraphicsElement;
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
  moveTo(x: number, y: number): this {
    const c = this.getCentre();
    const t = this.#createTransform();

    t.setTranslate(x - c.x, y - c.y);

    this.#addTransform(t);

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
  rotate(angle: number, cx?: number, cy?: number): this {
    const c = this.getCentre();
    const t = this.#createTransform();
    const originX = cx ?? c.x;
    const originY = cy ?? c.y;

    t.setRotate(angle, originX, originY);

    this.#addTransform(t);

    return this;
  }

  /**
   * Saves and downloads the SVG markup.
   */
  save(): void {
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
  scale(sx: number, sy?: number): this {
    const c = this.getCentre();
    const t1 = this.#createTransform();
    const t2 = this.#createTransform();

    const scaleY = sy ?? sx;
    t1.setTranslate((1 - sx) * c.x, (1 - scaleY) * c.y);
    t2.setScale(sx, scaleY);

    this.#addTransform(t1);
    this.#addTransform(t2);

    return this;
  }

  /**
   * Set the attribute values of an SVG element. Replaces _ with - for relevant attributes.
   *
   * @chainable
   * @param attributes - An object of attribute-value pairs.
   * @returns itself.
   */
  set(attributes: Record<string, string | number>): this {
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
  trackCursor(callback: EventListener | null = null): this {
    this.#isMainSVG();

    let point = new DOMPoint();

    this.element.addEventListener("pointermove", (event: Event) => {
      this.element.style.touchAction = "none";
      const e = event as PointerEvent;
      point.x = e.clientX;
      point.y = e.clientY;

      // Cast to SVGSVGElement for getScreenCTM
      const svgElement = this.element as unknown as SVGSVGElement;
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

  /**
   * Appends an SVG transform object to a transform list.
   *
   * @private
   * @param transform - An SVGTransform object.
   */
  #addTransform(transform: SVGTransform): void {
    // Cast to SVGGraphicsElement which has transform property
    const graphicsElement = this.element as unknown as SVGGraphicsElement;
    const transformList = graphicsElement.transform.baseVal;
    transformList.appendItem(transform);
  }

  /**
   * Allows for the creation of a cumulative transform.
   *
   * @private
   * @returns An SVGTransform object.
   */
  #createTransform(): SVGTransform {
    const root = new SvJs();
    // Create a temporary SVG element for transform creation
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg") as SVGSVGElement;
    return svg.createSVGTransform();
  }

  /**
   * Checks if the defs element already exists, and creates it if it doesn't.
   *
   * @private
   * @returns The defs element.
   */
  #defsCheck(): SVGDefsElement {
    let defs: SVGDefsElement;
    const existingDefs = document.querySelector("defs");

    if (existingDefs) {
      defs = existingDefs as SVGDefsElement;
    } else {
      const newDefs = new SvJs("defs");
      defs = newDefs.element as SVGDefsElement;
      this.element.prepend(defs);
    }
    return defs;
  }

  /**
   * Check if the element is the main SVG element.
   *
   * @private
   * @throws {Error} If the element is not the main SVG.
   */
  #isMainSVG(): void {
    if (this.element.nodeName !== "svg") {
      throw new Error(
        "This function can only be called on the main SVG element."
      );
    }
  }

  /**
   * Check if the created SVG element is valid.
   *
   * @private
   * @throws {Error} If the element is not a valid SVG element.
   */
  #isValid(): void {
    const elementToString = Object.prototype.toString
      .call(this.element)
      .toLowerCase();

    if (
      elementToString !==
      `[object svg${this.element.nodeName.toLowerCase()}element]`
    ) {
      throw new Error(`Invalid SVG element: ${this.element.nodeName}`);
    }
  }
}
