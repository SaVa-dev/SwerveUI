// View.ts

import type { ViewStyle } from "../styles/ViewStyles";
import { register } from "./context";

import type { FrameStyle } from "../styles/Frame";
import type { Color } from "../styles/Color";
import type { Shadow } from "../styles/Shadow";
import type { PaddingStyle } from "../styles/ViewStyles";

export abstract class View {
    public readonly style: ViewStyle = {}
    public readonly children: View[] = []
    public onClickAction: any = undefined

    constructor() {
        register(this)
    }

    padding(value: number | PaddingStyle): this {
        this.style.padding = value;
        return this;
    }

    background(value: Color | string): this {
        this.style.background = value
        return this
    }

    foreground(value: Color | string): this {
        this.style.foreground = value;
        return this;
    }

    cornerRadius(value: number): this {
        this.style.cornerRadius = value
        return this
    }

    lineSpacing(value: number): this {
        this.style.lineSpacing = value
        return this
    }

    shadow(value: Shadow): this {
        if (value.contentAware === false) {
            this.style.boxShadow = value;
        } else {
            this.style.contentShadow = value;
        }

        return this;
    }

    onClick(onClickAction: () => void): this {
        this.onClickAction = onClickAction
        return this
    }

    private cleanups: (() => void)[] = [];

    protected observe(
        subscribe: (callback: () => void) => () => void,
        update: () => void
    ): void {
        this.cleanups.push(subscribe(update));
    }

    dispose(): void {
        for (const cleanup of this.cleanups) {
            cleanup();
        }

        this.cleanups = [];
    }

    track(subscribe: (callback: () => void) => () => void, update: () => void): void {
        this.observe(subscribe, update);
    }

    frame(value: FrameStyle): this {
        this.style.frame = value;
        return this;
    }
}
