export function timeout(count: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, count));
}
