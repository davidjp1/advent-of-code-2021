export function run(part: number, input: string[]): number {
    if(part === 1) {
        return part1(input);
    }
    if(part === 2) { 
        return part2(input);
    }
    
    throw Error(`Part ${part} not implemented`);
}

function part1(input: string[]): number {
    const [gamma, epsilon] = getGammaAndEpsilon(input);
    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function part2(input: string[]): number {
    const oxygen = parseInt(calcRating(input, true, 0), 2);
    const co2 = parseInt(calcRating(input, false, 0), 2);
    return oxygen * co2;
}

function calcRating(input: string[], isGamma: boolean, i : number): string {
    const target = isGamma ? getGammaAtIndex(input, i) : getEpsilonAtIndex(input, i);
    const next = input.filter(line => line[i] === target);
    if(next.length === 1){
        return next[0];
    }
    else {
        return calcRating(next, isGamma, i + 1);
    }
}

function getGammaAndEpsilon(input: string[]): [string, string] {
    let gamma = '';
    const numOfBits = input[0].length;
    for(let i = 0; i < numOfBits; i++) {
        gamma += getGammaAtIndex(input, i);
    }
    const epsilon = gamma.split('').map(bit => bit === '1' ? '0' : '1').join('');
    return [gamma, epsilon];
}

function getGammaAtIndex(input: string[], i: number): string {
    let count = 0;
    for(let j = 0; j < input.length; j++) {
        count += parseInt(input[j][i], 10);
    }
    return count >= input.length / 2 ? '1' : '0';
}

function getEpsilonAtIndex(input: string[], i: number): string {
    return getGammaAtIndex(input, i) === '1' ? '0' : '1';
}