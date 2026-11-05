// ButtonView.ts

import { View } from "../core/View"

export class ButtonView extends View {
    public readonly text: string

    constructor(text: string, action?: () => void) {
        super();
        this.text = text;

        if (action !== undefined) this.onClick(action)
    }
}

export function Button(text: string, action?: () => void ): ButtonView {
    return new ButtonView(text, action)
}