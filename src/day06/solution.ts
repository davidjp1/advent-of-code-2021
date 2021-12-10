export function run(part: number, input: string[]): number {
    const fishes = input[0].split(',').map(a => parseInt(a,10));
    if(part === 1) {
        return calculateNumberOfFish(fishes, 80);
    }  
    if(part === 2) {
        return calculateNumberOfFish(fishes, 256);
    }
    throw Error(`Part ${part} not implemented`);
}

function calculateNumberOfFish (fishes: number[], maxDays: number) {
    const expansionRates = [...Array(6).keys()].slice(1).map(fishAge => {
        console.log(`Calculating expansion rate for fish age ${fishAge}`);
        return fishExpansionRate(fishAge, 0, 0, maxDays);
    });
    return fishes.map(fish => expansionRates[fish - 1]).reduce((a,b) => a + b, 0) + fishes.length;
}

function fishExpansionRate(fishAge: number, fishCount: number, day: number, maxDays: number): number {
    if(day === maxDays){
        return fishCount;
    }
    if(fishAge > 0) {
        return fishExpansionRate(fishAge - 1, fishCount, day + 1, maxDays);
    }
    else {
        return fishExpansionRate(6, fishCount, day + 1, maxDays) + fishExpansionRate(8, 1, day + 1, maxDays);
    }
}
