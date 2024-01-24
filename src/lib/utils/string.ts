export function join(self: string, ...args: (string | undefined | null)[]) {
  return args.reduceRight((a, b) => (b ? a.concat(" ", b) : a), self);
}
