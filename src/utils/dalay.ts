export const dalay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))
