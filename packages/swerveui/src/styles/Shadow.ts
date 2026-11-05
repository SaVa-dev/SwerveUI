import type { Color } from "./Color";

export interface Shadow {
    color?: Color | string;
    radius?: number;
    x?: number;
    y?: number;
    contentAware?: boolean;
}