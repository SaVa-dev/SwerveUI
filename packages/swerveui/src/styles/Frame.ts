export const Size = {
    fill: "fill",
    screen: "screen",
} as const;

export type Size = (typeof Size)[keyof typeof Size];

export type FrameValue = Size | string | number;

export interface Frame {
    width?: FrameValue;
    height?: FrameValue;
}

export type FrameStyle = Frame | FrameValue;