import type { ButtonView } from "../../views/ButtonView";
import type { RendererAdapter } from "../Renderer";

export class WebButtonAdapter implements RendererAdapter<ButtonView, Node> {
    render(view: ButtonView): Node {
        const element = document.createElement("button")

        element.textContent = view.text
        return element
    }
}