import type { Color } from "./Color";
import type { FrameStyle } from "./Frame";
import type { Shadow } from "./Shadow";

export interface PaddingStyle {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
}

export interface ViewStyle {
    padding?: number | PaddingStyle;
    background?: Color | string;
    foreground?: Color | string;
    cornerRadius?: number;
    lineSpacing?: number;
    frame?: FrameStyle;
    boxShadow?: Shadow;
    contentShadow?: Shadow;
}