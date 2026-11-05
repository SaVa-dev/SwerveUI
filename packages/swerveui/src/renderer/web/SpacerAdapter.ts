import type { RendererAdapter } from "../Renderer";
import type { SpacerView } from "../../views/SpacerView";

export class WebSpacerAdapter implements RendererAdapter<SpacerView, Node> {
    render(): Node {
        const element = document.createElement("div");

        element.style.flexGrow = "1";
        element.style.minHeight = "0";
        element.style.minWidth = "0";

        return element;
    }
}