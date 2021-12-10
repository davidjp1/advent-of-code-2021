export function run(part: number, input: string[]): number {
    const crabPositions = input[0].split(',').map(a => parseInt(a,10));
    if(part === 1){
        return part1(crabPositions);
    }
    if(part === 2){
        return part2(crabPositions);
    }
    throw Error(`Part ${part} not implemented`);
}

function part1(crabPositions: number[]) {
    const medianPosition = median(crabPositions);
    return crabPositions.reduce((a,b) => a + Math.abs(b - medianPosition), 0);
}

function part2(crabPositions: number[]) {
    const meanPosition = Math.floor(mean(crabPositions));
    return crabPositions.reduce((a,b) => a + triangle(Math.abs(b - meanPosition)), 0);
}

const mean = (arr: number[]): number => arr.reduce((a,b) => a+b, 0) / arr.length;

const median = (arr: number[]): number => {
    const sorted = arr.slice().sort((a,b) => a-b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid] + sorted[mid-1]) / 2 : sorted[mid];
};

function triangle(a: number) {
    return (a * (a + 1)) / 2;
}