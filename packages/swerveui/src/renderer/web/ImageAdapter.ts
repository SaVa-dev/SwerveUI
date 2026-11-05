import type { RendererAdapter } from "../Renderer";
import { ImageView } from "../../views/ImageView";
import { GenericViewAdapter } from "./GenericViewAdapter";

export class WebImageAdapter implements RendererAdapter<ImageView, Node> {
    render(view: ImageView): Node {
        const e = document.createElement("img")
        const boxShadow = view.style.boxShadow;
        const contentShadow = view.style.contentShadow;

        e.src = view.image_path

        if (boxShadow) {
            e.style.boxShadow =
                GenericViewAdapter.shadowValue(boxShadow);
        }

        if (contentShadow) {
            e.style.filter =
                `drop-shadow(${GenericViewAdapter.dropShadowValue(contentShadow)})`;
        }

        return e
    }
}