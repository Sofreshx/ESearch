export function buildQueryString(params: Partial<Record<keyof any, any>>): string {
    const queryParts = Object.entries(params)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);
    return queryParts.join('&');
}