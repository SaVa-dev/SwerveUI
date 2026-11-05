export const Color = {
    BLACK: "#000000",
    WHITE: "#ffffff",
    RED: "#ef4444",
    BLUE: "#3b82f6",
    PRIMARY: "#2563eb",
    SECONDARY: "#64748b"
} as const;

export type Color = (typeof Color)[keyof typeof Color];