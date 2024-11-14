export function generateRequestId() {
    return Date.now().toString(36)
        + '-' + Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER).toString(36)
        + '-' + Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER).toString(36)
}
