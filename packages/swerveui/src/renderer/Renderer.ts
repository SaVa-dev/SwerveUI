// Render.ts

import type { View } from "../core/View";

export interface RendererAdapter<V extends View, N> {
    render(view: V, renderer: Renderer<N>): N;
}

type ViewConstructor<V extends View = View> = abstract new (...args: any[]) => V;

export abstract class Renderer<N> {
    private readonly adapters = new Map<ViewConstructor, RendererAdapter<any, N>>();

    register<V extends View>(type: ViewConstructor<V>, adapter: RendererAdapter<V, N>): void {
        this.adapters.set(type, adapter);
    }

    render(view: View): N {
        const adapter = this.adapters.get(
            view.constructor as ViewConstructor
        );

        if (!adapter) throw new Error(`No adapter registered for ${view.constructor.name}`);

        return this.finalize(view, adapter.render(view, this));
    }

    protected finalize(view: View, node: N): N {
        return node;
    }
}
