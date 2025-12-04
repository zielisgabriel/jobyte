export async function apiDelay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}