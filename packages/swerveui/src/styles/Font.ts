
export type FontWeight =
    | "ultraLight"
    | "thin"
    | "light"
    | "regular"
    | "medium"
    | "semibold"
    | "bold"
    | "heavy"
    | "black"
    | number;

export type FontDesign =
    | "default"
    | "serif"
    | "rounded"
    | "monospaced";

export type FontWidth =
    | "compressed"
    | "condensed"
    | "standard"
    | "expanded"
    | "extraExpanded";

export type FontLeading = "tight" | "standard" | "loose";

export type FontTag =
    | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    | "p" | "span" | "small"
    | "strong" | "b" | "em" | "i"
    | "u" | "s" | "del" | "ins" | "mark"
    | "sub" | "sup"
    | "blockquote" | "q" | "cite"
    | "abbr" | "dfn"
    | "code" | "pre" | "kbd" | "samp" | "var"
    | "label" | "address" | "time" | "output";

export interface FontOptions {
    tag?: FontTag;
    family?: string;
    src?: string;
    size?: number;
    weight?: FontWeight;
    design?: FontDesign;
    italic?: boolean;
    width?: FontWidth;
    leading?: FontLeading;
    monospacedDigit?: boolean;
    smallCaps?: boolean;
    lowercaseSmallCaps?: boolean;
    uppercaseSmallCaps?: boolean;
}

const FONT_TAGS: readonly FontTag[] = [
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "span", "small", "strong", "b", "em", "i",
    "u", "s", "del", "ins", "mark", "sub", "sup",
    "blockquote", "q", "cite", "abbr", "dfn",
    "code", "pre", "kbd", "samp", "var",
    "label", "address", "time", "output",
];

const FONT_WEIGHTS: Record<string, number> = {
    ultraLight: 100,
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    heavy: 800,
    black: 900,
};

const FONT_DESIGNS: Record<FontDesign, string> = {
    default: "system-ui, sans-serif",
    serif: "ui-serif, Georgia, serif",
    rounded: "ui-rounded, system-ui, sans-serif",
    monospaced: "ui-monospace, SFMono-Regular, monospace",
};

export type FontName = {
    [K in keyof typeof Font]:
        (typeof Font)[K] extends Font ? K : never
}[keyof typeof Font];


export class Font {
    public readonly options: Readonly<FontOptions>;

    constructor(options: FontOptions = {}) {
        if (
            options === null ||
            typeof options !== "object" ||
            Array.isArray(options)
        ) {
            throw new TypeError(
                "Font: expected an options object.",
            );
        }

        const allowedKeys = new Set([
            "tag",
            "family",
            "src",
            "size",
            "weight",
            "design",
            "italic",
            "width",
            "leading",
            "monospacedDigit",
            "smallCaps",
            "lowercaseSmallCaps",
            "uppercaseSmallCaps",
        ]);

        for (const key of Object.keys(options)) {
            if (!allowedKeys.has(key)) {
                throw new TypeError(
                    `Font: unexpected option "${key}". Check the Font options object.`,
                );
            }
        }

        if (
            options.tag !== undefined &&
            !FONT_TAGS.includes(options.tag)
        ) {
            throw new TypeError(
                `Font: unknown HTML tag "${options.tag}".`,
            );
        }

        if (
            options.size !== undefined &&
            (!Number.isFinite(options.size) || options.size <= 0)
        ) {
            throw new TypeError(
                "Font: size must be a positive finite number.",
            );
        }

        if (
            options.weight !== undefined &&
            !(
                typeof options.weight === "number"
                    ? Number.isFinite(options.weight) &&
                      options.weight >= 1 &&
                      options.weight <= 1000
                    : Object.hasOwn(FONT_WEIGHTS, options.weight)
            )
        ) {
            throw new TypeError(
                `Font: invalid weight "${options.weight}".`,
            );
        }

        if (
            options.design !== undefined &&
            !Object.hasOwn(FONT_DESIGNS, options.design)
        ) {
            throw new TypeError(
                `Font: unknown design "${options.design}".`,
            );
        }

        if (
            options.width !== undefined &&
            ![
                "compressed",
                "condensed",
                "standard",
                "expanded",
                "extraExpanded",
            ].includes(options.width)
        ) {
            throw new TypeError(
                `Font: invalid width "${options.width}".`,
            );
        }

        if (
            options.leading !== undefined &&
            !["tight", "standard", "loose"].includes(options.leading)
        ) {
            throw new TypeError(
                `Font: invalid leading "${options.leading}".`,
            );
        }

        for (const key of ["family", "src"] as const) {
            if (
                options[key] !== undefined &&
                typeof options[key] !== "string"
            ) {
                throw new TypeError(
                    `Font: "${key}" must be a string.`,
                );
            }
        }

        for (const key of [
            "italic",
            "monospacedDigit",
            "smallCaps",
            "lowercaseSmallCaps",
            "uppercaseSmallCaps",
        ] as const) {
            if (
                options[key] !== undefined &&
                typeof options[key] !== "boolean"
            ) {
                throw new TypeError(
                    `Font: "${key}" must be a boolean.`,
                );
            }
        }

        this.options = Object.freeze({ ...options });
    }

    get tag(): FontTag | undefined {
        return this.options.tag;
    }

    // MARK: - Native HTML text presets
    // These specify semantics, not CSS overrides.
    // The browser keeps its native default styling.

    static readonly h1 = new Font({ tag: "h1" });
    static readonly h2 = new Font({ tag: "h2" });
    static readonly h3 = new Font({ tag: "h3" });
    static readonly h4 = new Font({ tag: "h4" });
    static readonly h5 = new Font({ tag: "h5" });
    static readonly h6 = new Font({ tag: "h6" });

    static readonly p = new Font({ tag: "p" });
    static readonly span = new Font({ tag: "span" });
    static readonly small = new Font({ tag: "small" });
    static readonly strong = new Font({ tag: "strong" });
    static readonly b = new Font({ tag: "b" });
    static readonly em = new Font({ tag: "em" });
    static readonly i = new Font({ tag: "i" });
    static readonly u = new Font({ tag: "u" });
    static readonly s = new Font({ tag: "s" });
    static readonly del = new Font({ tag: "del" });
    static readonly ins = new Font({ tag: "ins" });
    static readonly mark = new Font({ tag: "mark" });
    static readonly sub = new Font({ tag: "sub" });
    static readonly sup = new Font({ tag: "sup" });
    static readonly blockquote = new Font({ tag: "blockquote" });
    static readonly q = new Font({ tag: "q" });
    static readonly cite = new Font({ tag: "cite" });
    static readonly abbr = new Font({ tag: "abbr" });
    static readonly dfn = new Font({ tag: "dfn" });
    static readonly code = new Font({ tag: "code" });
    static readonly pre = new Font({ tag: "pre" });
    static readonly kbd = new Font({ tag: "kbd" });
    static readonly samp = new Font({ tag: "samp" });
    static readonly variable = new Font({ tag: "var" });
    static readonly label = new Font({ tag: "label" });
    static readonly address = new Font({ tag: "address" });
    static readonly time = new Font({ tag: "time" });
    static readonly output = new Font({ tag: "output" });

    // MARK: - SwiftUI-inspired text styles
    // HTML tag provides semantics; size and weight provide appearance.
    // Sizes are SwerveUI defaults, not Apple's exact platform values.

    static readonly extraLargeTitle2 = new Font({
        tag: "h1",
        size: 48,
        weight: "regular",
    });

    static readonly extraLargeTitle = new Font({
        tag: "h1",
        size: 40,
        weight: "regular",
    });

    static readonly largeTitle = new Font({
        tag: "h1",
        size: 34,
        weight: "regular",
    });

    static readonly title = new Font({
        tag: "h2",
        size: 28,
        weight: "regular",
    });

    static readonly title2 = new Font({
        tag: "h3",
        size: 22,
        weight: "regular",
    });

    static readonly title3 = new Font({
        tag: "h4",
        size: 20,
        weight: "regular",
    });

    static readonly headline = new Font({
        tag: "strong",
        size: 17,
        weight: "semibold",
    });

    static readonly subheadline = new Font({
        tag: "span",
        size: 15,
        weight: "regular",
    });

    static readonly body = new Font({
        tag: "p",
        size: 17,
        weight: "regular",
    });

    static readonly callout = new Font({
        tag: "p",
        size: 16,
        weight: "regular",
    });

    static readonly footnote = new Font({
        tag: "small",
        size: 13,
        weight: "regular",
    });

    static readonly caption = new Font({
        tag: "small",
        size: 12,
        weight: "regular",
    });

    static readonly caption2 = new Font({
        tag: "small",
        size: 11,
        weight: "regular",
    });

    // MARK: - Semantic aliases
    // Aliases reuse existing instances where appropriate.

    static readonly H1 = Font.h1;
    static readonly H2 = Font.h2;
    static readonly H3 = Font.h3;
    static readonly H4 = Font.h4;
    static readonly H5 = Font.h5;
    static readonly H6 = Font.h6;

    static readonly P = Font.p;
    static readonly SPAN = Font.span;
    static readonly SMALL = Font.small;
    static readonly STRONG = Font.strong;
    static readonly B = Font.b;
    static readonly EM = Font.em;
    static readonly I = Font.i;
    static readonly U = Font.u;
    static readonly S = Font.s;
    static readonly DEL = Font.del;
    static readonly INS = Font.ins;
    static readonly MARK = Font.mark;
    static readonly SUB = Font.sub;
    static readonly SUP = Font.sup;
    static readonly BLOCKQUOTE = Font.blockquote;
    static readonly Q = Font.q;
    static readonly CITE = Font.cite;
    static readonly ABBR = Font.abbr;
    static readonly DFN = Font.dfn;
    static readonly CODE = Font.code;
    static readonly PRE = Font.pre;
    static readonly KBD = Font.kbd;
    static readonly SAMP = Font.samp;
    static readonly VAR = Font.variable;
    static readonly LABEL = Font.label;
    static readonly ADDRESS = Font.address;
    static readonly TIME = Font.time;
    static readonly OUTPUT = Font.output;

    // MARK: - Font constructors

    static system(
        size: number,
        options: Omit<FontOptions, "size" | "src"> = {},
    ): Font {
        return new Font({
            ...options,
            size,
            family: options.family ?? "system-ui",
        });
    }

    static custom(
        family: string,
        options: FontOptions = {},
    ): Font {
        return new Font({
            ...options,
            family,
        });
    }

    static resolve(font: Font | FontName | string): Font {
        if (font instanceof Font) {
            return font;
        }

        const resolved: unknown = Font[font as keyof typeof Font];

        if (!(resolved instanceof Font)) {
            throw new TypeError(`Font.resolve(): unknown font preset "${font}".`);
        }

        return resolved;
    }

    // MARK: - Instance modifiers

    bold(enabled: boolean = true): Font {
        return this.with({
            weight: enabled ? "bold" : "regular",
        });
    }

    italic(enabled: boolean = true): Font {
        return this.with({ italic: enabled });
    }

    monospaced(enabled: boolean = true): Font {
        return this.with({
            design: enabled ? "monospaced" : "default",
        });
    }

    monospacedDigit(enabled: boolean = true): Font {
        return this.with({ monospacedDigit: enabled });
    }

    smallCaps(enabled: boolean = true): Font {
        return this.with({ smallCaps: enabled });
    }

    lowercaseSmallCaps(enabled: boolean = true): Font {
        return this.with({ lowercaseSmallCaps: enabled });
    }

    uppercaseSmallCaps(enabled: boolean = true): Font {
        return this.with({ uppercaseSmallCaps: enabled });
    }

    weight(weight: FontWeight): Font {
        return this.with({ weight });
    }

    width(width: FontWidth): Font {
        return this.with({ width });
    }

    leading(leading: FontLeading): Font {
        return this.with({ leading });
    }

    pointSize(size: number): Font {
        return this.with({ size });
    }

    scaled(by: number): Font {
        if (!Number.isFinite(by) || by <= 0) {
            throw new TypeError(
                "Font.scaled(): scale must be a positive finite number.",
            );
        }

        if (this.options.size === undefined) {
            throw new TypeError(
                "Font.scaled(): this font has no explicit size to scale.",
            );
        }

        return this.with({
            size: this.options.size * by,
        });
    }

    family(family: string): Font {
        return this.with({ family });
    }

    design(design: FontDesign): Font {
        return this.with({ design });
    }

    tagAs(tag: FontTag): Font {
        return this.with({ tag });
    }

    private with(options: Partial<FontOptions>): Font {
        return new Font({
            ...this.options,
            ...options,
        });
    }

    // MARK: - CSS conversion

    toCSS(): Record<string, string> {
        const options = this.options;
        const css: Record<string, string> = {};

        if (options.family) {
            css.fontFamily = options.family;
        } else if (
            options.design !== undefined &&
            options.design !== "default"
        ) {
            css.fontFamily = FONT_DESIGNS[options.design];
        }

        if (options.size !== undefined) {
            css.fontSize = `${options.size}px`;
        }

        if (options.weight !== undefined) {
            css.fontWeight = String(
                typeof options.weight === "number"
                    ? options.weight
                    : FONT_WEIGHTS[options.weight],
            );
        }

        if (options.italic !== undefined) {
            css.fontStyle = options.italic ? "italic" : "normal";
        }

        if (options.width) {
            const widths: Record<FontWidth, string> = {
                compressed: "50%",
                condensed: "75%",
                standard: "100%",
                expanded: "125%",
                extraExpanded: "150%",
            };

            css.fontStretch = widths[options.width];
        }

        if (options.leading) {
            const leading: Record<FontLeading, string> = {
                tight: "1.1",
                standard: "1.5",
                loose: "1.8",
            };

            css.lineHeight = leading[options.leading];
        }

        if (options.monospacedDigit) {
            css.fontVariantNumeric = "tabular-nums";
        }

        if (
            options.smallCaps ||
            options.lowercaseSmallCaps ||
            options.uppercaseSmallCaps
        ) {
            css.fontVariantCaps = options.uppercaseSmallCaps
                ? "all-small-caps"
                : options.lowercaseSmallCaps
                    ? "all-petite-caps"
                    : "small-caps";
        }

        return css;
    }
}
