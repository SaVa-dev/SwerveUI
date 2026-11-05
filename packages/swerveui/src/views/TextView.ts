import { View } from "../core/View";
import { Font } from "../styles/Font"

type ReactiveValue = {
    (): unknown;
    subscribe(callback: () => void): () => void;
};

type TextPart = string | ReactiveValue;

export class TextView extends View {
    public readonly parts: TextPart[];
    public fontType: Font = Font.title;

    constructor(parts: TextPart[]) {
        super();
        this.parts = parts;
    }

    get text(): string {
        return this.parts
            .map(part =>
                typeof part === "string"
                    ? part
                    : String(part())
            )
            .join("");
    }

    font(font: Font | string): this {
        this.fontType = Font.resolve(font);
        return this;
    }
}

export function Text(text: string): TextView;
export function Text(text: TemplateStringsArray, ...values: unknown[]): TextView;

export function Text(
    text: string | TemplateStringsArray,
    ...values: unknown[]
): TextView {
    if (typeof text === "string") {
        return new TextView([text]);
    }

    const parts: TextPart[] = [];

    for (let i = 0; i < values.length; i++) {
        parts.push(text[i]);

        const value = values[i];
        if (typeof value === "function" && "subscribe" in value) {
            parts.push(value as ReactiveValue);
        } else {
            parts.push(String(value));
        }
    }

    parts.push(text[text.length - 1]);

    return new TextView(parts);
}