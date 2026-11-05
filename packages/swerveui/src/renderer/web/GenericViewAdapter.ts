
import type { View } from "../../core/View";
import { Size } from "../../styles/Frame";
import type { Shadow } from "../../styles/Shadow";

export class GenericViewAdapter {
    static applyStyles(view: View, element: HTMLElement): HTMLElement {
        const style = view.style;

        if (style.padding !== undefined) {
            const padding = style.padding;

            if (typeof padding === "number") {
                element.style.padding = `${padding}px`;
            } else {
                if (padding.top !== undefined) {
                    element.style.paddingTop = `${padding.top}px`;
                }

                if (padding.bottom !== undefined) {
                    element.style.paddingBottom = `${padding.bottom}px`;
                }

                if (padding.left !== undefined) {
                    element.style.paddingLeft = `${padding.left}px`;
                }

                if (padding.right !== undefined) {
                    element.style.paddingRight = `${padding.right}px`;
                }
            }
        }

        if (style.background !== undefined) {
            element.style.backgroundColor = style.background;
        }

        if (style.cornerRadius !== undefined) {
            element.style.borderRadius = `${style.cornerRadius}px`;
        }

        if (style.lineSpacing !== undefined) {
            element.style.lineHeight = `${style.lineSpacing}px`;
        }

        if (style.foreground !== undefined) {
            element.style.color = style.foreground;
        }

        // La sombra se aplica en el adapter específico de cada vista.
        // Así evitamos combinar accidentalmente box-shadow con
        // text-shadow o filter: drop-shadow().

        const frame = style.frame;

        if (frame === Size.fill) {
            element.style.width = "100%";
            element.style.height = "100%";
        } else if (frame !== undefined && typeof frame === "object") {
            if (frame.width !== undefined) {
                element.style.width =
                    frame.width === Size.fill
                        ? "100%"
                        : typeof frame.width === "number"
                            ? `${frame.width}px`
                            : frame.width;
            }

            if (frame.height !== undefined) {
                element.style.height =
                    frame.height === Size.fill
                        ? "100%"
                        : typeof frame.height === "number"
                            ? `${frame.height}px`
                            : frame.height;
            }
        } else if (frame !== undefined) {
            const value =
                typeof frame === "number" ? `${frame}px` : frame;

            element.style.width = value;
            element.style.height = value;
        }

        if (view.onClickAction !== undefined) {
            element.addEventListener("click", () => {
                view.onClickAction();
            });
        }

        return element;
    }

    static shadowValue(shadow: Shadow): string {
        const x = shadow.x ?? 0;
        const y = shadow.y ?? 2;
        const radius = shadow.radius ?? 4;
        const color = shadow.color ?? "rgba(0, 0, 0, 0.25)";

        return `${x}px ${y}px ${radius}px ${color}`;
    }

    static dropShadowValue(shadow: Shadow): string {
        return GenericViewAdapter.shadowValue(shadow);
    }
}
