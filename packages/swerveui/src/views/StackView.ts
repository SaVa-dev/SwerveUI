import { View } from "../core/View"
import { collectChildren } from "../core/context"

export const Direction = {
    vertical: "vertical",
    horizontal: "horizontal",
} as const
export type Direction = (typeof Direction)[keyof typeof Direction]

export const Align = {
    lead: "leading",
    center: "center",
    trail: "trailing",
} as const
export type Align = (typeof Align)[keyof typeof Align]

export const Justify = {
    start: "start",
    center: "center",
    end: "end",
    space_between: "space-between",
    space_around: "space-around",
    space_evenly: "space-evenly",
} as const
export type Justify = (typeof Justify)[keyof typeof Justify]

export const Size = {
    fill: "fill",
    screen: "screen",
} as const
export type Size = (typeof Size)[keyof typeof Size]

export class StackView extends View {
    public alignmentValue: Align = Align.center;
    public justifyContentValue: Justify = Justify.start;
    public spacingValue = 0;
    public direction: Direction

    constructor(direction: Direction) {
        super();
        this.direction = direction
    }

    alignment(value: Align): this {
        this.alignmentValue = value
        return this
    }

    justify(value: Justify): this {
        this.justifyContentValue = value
        return this
    }

    spacing(value: number): this {
        this.spacingValue = value
        return this
    }
}

const __StackBuilder =
    (direction: Direction) =>
    (content: () => void): StackView => {
        const stack = new StackView(direction);
        stack.children.push(...collectChildren(content));
        return stack;
    };

export const VStack = __StackBuilder(Direction.vertical);
export const HStack = __StackBuilder(Direction.horizontal);