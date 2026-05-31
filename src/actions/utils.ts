// NOTE: useCanvas is a React hook — consider moving to src/hooks.ts

export const delay = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, milliseconds))

export const flattenArrayRecursively = <T>(array: T[] | T[][]): T[] => {
  if (!Array.isArray(array[0])) return array as T[]
  const newArray = (array as T[][]).reduce((prev, curr) => prev.concat(curr))
  return flattenArrayRecursively(newArray)
}
