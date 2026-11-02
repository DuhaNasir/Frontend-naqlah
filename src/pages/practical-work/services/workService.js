// Local demo record identity; this is not an authentication or security token.
// It also works on plain HTTP previews where crypto.randomUUID is unavailable.
export function createWorkId() {
  return `work-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
