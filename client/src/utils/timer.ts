export function delay<T = undefined>(timeout: number, resolveFn?: () => T): Promise<T> {
    const value = resolveFn ? resolveFn() : undefined
    return new Promise(resolve => window.setTimeout(() => resolve(value), timeout))
}
