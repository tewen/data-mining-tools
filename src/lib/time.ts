export function timeout(count: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, count));
}

export function randomTimeout(min: number = 1000, max: number = 10000): Promise<any> {
  const count: number = Math.floor(Math.random() * (max - min)) + min;
  return timeout(count);
}
