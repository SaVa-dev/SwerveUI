type Subscriber = () => void;

type ReactiveState<T> =
    T &
    (() => T) & {
        [Symbol.toPrimitive](): T extends number | string
            ? T
            : string;
        subscribe(callback: Subscriber): () => void;
    };

export function State<T>(
    initialValue: T
): [ReactiveState<T>, (newValue: T) => void] {
    let value = initialValue;
    const subscribers = new Set<Subscriber>();

    const state = (() => value) as ReactiveState<T>;

    Object.defineProperty(state, "v", {
        get: () => value,
        set: (newValue: T) => {
            setValue(newValue);
        },
    });

    state[Symbol.toPrimitive] = () => {
        if (typeof value === "number" || typeof value === "string") {
            return value as any;
        }

        return String(value) as any;
    };

    state.subscribe = (callback) => {
        subscribers.add(callback);
        return () => subscribers.delete(callback);
    };

    const setValue = (newValue: T) => {
        if (Object.is(value, newValue)) return;

        value = newValue;

        for (const subscriber of subscribers) {
            subscriber();
        }
    };

    return [state, setValue];
}