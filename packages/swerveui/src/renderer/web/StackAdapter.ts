// StackAdapter.ts

import type { RendererAdapter } from "../Renderer";
import type { WebRender } from "../WebRender.ts";
import {
    Align,
    Direction,
    Justify,
    type StackView,
} from "../../views/StackView";

const alignmentStyles: Record<Align, string> = {
    [Align.lead]: "flex-start",
    [Align.center]: "center",
    [Align.trail]: "flex-end",
};

const justifyContentStyles: Record<Justify, string> = {
    [Justify.start]: "flex-start",
    [Justify.center]: "center",
    [Justify.end]: "flex-end",
    [Justify.space_between]: "space-between",
    [Justify.space_around]: "space-around",
    [Justify.space_evenly]: "space-evenly",
};

export class WebStackAdapter implements RendererAdapter<StackView, Node> {
    render(view: StackView, renderer: WebRender): Node {
        const e = document.createElement("div");

        e.style.display = "flex";
        e.style.flexDirection =
            view.direction === Direction.vertical ? "column" : "row";

        e.style.alignItems = alignmentStyles[view.alignmentValue];
        e.style.justifyContent =
            justifyContentStyles[view.justifyContentValue];

        e.style.gap = `${view.spacingValue}px`;

        e.style.boxSizing = "border-box";

        for (const child of view.children) {
            e.appendChild(renderer.render(child));
        }

        return e;
    }
}
