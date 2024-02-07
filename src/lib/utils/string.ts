export function join(self: string, ...args: (string | undefined | null)[]) {
  return args.reduceRight((a, b) => (b ? a.concat(" ", b) : a), self);
}

export function truncate(self: string) {
  return self.slice(0, 8) + "..." + self.slice(16, 32);
}
