import { View } from "../core/View";

export class ImageView extends View {
    public readonly image_path: string

    constructor(image_path: string) {
        super()
        this.image_path = image_path
    }
}

export function Image(path: string) {
    return new ImageView(path)
}