export * from "./style";
export * from "./toaster";


export function plural(count: number, singular: string): string {
  return `${count} ${singular}${count !== 1 ? "s" : ""}`;
}
