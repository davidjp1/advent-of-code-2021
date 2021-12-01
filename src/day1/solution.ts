function getCountOfIncreasing(input: number[]): number {
  let increasing = 0;
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i + 1] > input[i]) {
      increasing++;
    }
  }
  return increasing;
}

export function run(part: number, input: string[]): number {
  const depths = input.map(a => parseInt(a));
  if (part === 1) {
    return getCountOfIncreasing(depths);
  }
  else if (part === 2) {
    const windows: number[] = [];
    for (let i = 0; i < depths.length - 2; i++) {
      windows.push(depths[i] + depths[i + 1] + depths[i + 2]);
    }
    return getCountOfIncreasing(windows);
  }
  else {
    throw Error(`Part ${part} not implemented`);
  }
}