// WebRender.ts

import { Renderer } from "./Renderer";

import type { View } from "../core/View";

import { ButtonView } from "../views/ButtonView";
import { ImageView } from "../views/ImageView";
import { StackView } from "../views/StackView";
import { TextView } from "../views/TextView";
import { SpacerView } from "../views/SpacerView"

import { GenericViewAdapter } from "./web/GenericViewAdapter";
import { WebButtonAdapter } from "./web/ButtonAdapter";
import { WebImageAdapter } from "./web/ImageAdapter";
import { WebStackAdapter } from "./web/StackAdapter";
import { WebTextAdapter } from "./web/TextAdapter";
import { WebSpacerAdapter } from "./web/SpacerAdapter"

export class WebRender extends Renderer<Node> {
    constructor() {
        super();

        this.register(StackView, new WebStackAdapter());
        this.register(TextView, new WebTextAdapter());
        this.register(ButtonView, new WebButtonAdapter())
        this.register(ImageView, new WebImageAdapter())
        this.register(SpacerView, new WebSpacerAdapter());
    }

    mount(view: View, target?: string): void {
        let root: HTMLElement;

        if (target !== undefined) {
            const element = document.getElementById(target);
            if (!element) throw new Error(`Root element "${target}" not found`);

            root = element;

        } else {
            document.documentElement.style.cssText =
                "margin: 0; padding: 0; width: 100%; min-height: 100%;";

            document.body.style.cssText =
                "margin: 0; padding: 0; width: 100%; min-height: 100dvh;";

            
            const node = this.render(view);
            document.body.replaceChildren(node);

            return;
        }
        root.appendChild(this.render(view));
    }

    protected finalize(view: View, node: Node): Node {
        if (!(node instanceof HTMLElement)) {
            return node;
        }

        return GenericViewAdapter.applyStyles(view, node);
    }

}
