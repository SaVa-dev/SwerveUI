// TextAdapter.ts

import type { RendererAdapter } from "../Renderer";
import type { TextView } from "../../views/TextView";
import { GenericViewAdapter } from "./GenericViewAdapter";

export class WebTextAdapter implements RendererAdapter<TextView, Node> {
    render(view: TextView): Node {
        const font = view.fontType;
        const e = document.createElement(font.tag ?? "span");
        const boxShadow = view.style.boxShadow;
        const contentShadow = view.style.contentShadow;

        Object.assign(e.style, font.toCSS());

        const update = () => {
            e.textContent = view.text;
        };

        update();

        for (const part of view.parts) {
            if (typeof part !== "string") {
                view["observe"](part.subscribe, update);
            }
        }

        if (boxShadow) {
            e.style.boxShadow =
                GenericViewAdapter.shadowValue(boxShadow);
        }

        if (contentShadow) {
            e.style.filter =
                `drop-shadow(${GenericViewAdapter.dropShadowValue(contentShadow)})`;
        }

        return e;
    }
}
