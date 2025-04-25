export const getEuclidianPattern = (hits: number, steps: number): number[] => {
  if (hits > steps) {
    throw new Error("Hits cannot be greater than steps");
  }

  if (hits === 0) {
    return Array(steps).fill(0);
  }

  if (hits === steps) {
    return Array(steps).fill(1);
  }

  let pattern: number[] = [];
  let counts: number[] = [];
  let remainders: number[] = [hits];
  let divisor = steps - hits;
  let level = 0;

  while (true) {
    counts = [...counts, Math.floor(divisor / remainders[level])];
    remainders = [...remainders, divisor % remainders[level]];
    divisor = remainders[level];
    level = level + 1;

    if (remainders[level] <= 1) {
      break;
    }
  }

  counts = [...counts, divisor];

  const build = (l: number) => {
    if (l === -1) {
      pattern = [...pattern, 0];
    } else if (l === -2) {
      pattern = [...pattern, 1];
    } else {
      for (let i = 0; i < counts[l]; i++) {
        build(l - 1);
      }
      if (remainders[l] !== 0) {
        build(l - 2);
      }
    }
  };

  build(level);
  const i = pattern.indexOf(1);
  return [...pattern.slice(i), ...pattern.slice(0, i)];
};

export const rotatePattern = (pattern: number[], offset: number) => {
  const steps = pattern.length;

  return Array(steps)
    .fill(0)
    .map((_, i) => {
      const index = (i + steps + -offset) % steps;
      return pattern[index];
    });
};

export const getValueAtIndexWrapped = <T>(arr: T[], i: number): T => {
  return arr[i % arr.length];
};
