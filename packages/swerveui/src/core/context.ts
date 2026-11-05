import type { View } from "./View";

const contexts: View[][] = [];

export function register<T extends View>(view: T): T {
    const context = contexts[contexts.length - 1];

    if (context) {
        context.push(view);
    }

    return view;
}

export function collectChildren(
    builder: () => void
): View[] {
    const children: View[] = [];

    contexts.push(children);

    try {
        builder();
    } finally {
        contexts.pop();
    }

    return children;
}
