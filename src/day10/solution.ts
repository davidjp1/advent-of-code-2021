type Bracket = '[' | ']' | '{' | '}' | '(' | ')' | '<' | '>';
const penaltyPoints = {
    '(': 3,
    ')': 3,
    '[': 57,
    ']': 57,
    '{': 1197,
    '}': 1197,
    '<': 25137,
    '>': 25137
};
const awardPoints = {
    '(': 1,
    ')': 1,
    '[': 2,
    ']': 2,
    '{': 3,
    '}': 3,
    '<': 4,
    '>': 4
};
const bracketPairsOpening: {[bracket: string]: Bracket} = {
    ')': '(',
    '}': '{',
    ']': '[',
    '>': '<'
};
const bracketPairsClosing: {[bracket: string]: Bracket} = {
    '(': ')',
    '{': '}',
    '[': ']',
    '<': '>'
};

export function run(part: number, input: string[]): number {
    const processed = input.map(line => line.split('')) as Bracket[][];
    if(part === 1) {
        return part1(processed);
    }
    if(part == 2){
        return part2(processed);
    }
    throw new Error(`Part ${part} not implemented`);
}

function part1(input: Bracket[][]): number {
    return input.map(getUnbalanced)
        .filter(a => a !== null)
        .reduce((acc, curr) => acc + penaltyPoints[curr as Bracket], 0);
}

function part2(input: Bracket[][]): number {
    const scores = input
        .filter(line => getUnbalanced(line) === null)
        .map(line => autoComplete(line)
            .reduce((acc, curr) => acc * 5 + awardPoints[curr as Bracket], 0))
        .sort((a, b) => a - b);
    return scores[Math.floor(scores.length / 2)];
}

function getUnbalanced(brackets: Bracket[]): Bracket | null {
    const unbalanced: Bracket[] = [];
    for(let i = 0; i < brackets.length; i++) {
        if(brackets[i] === '[' || brackets[i] === '{' || brackets[i] === '(' || brackets[i] === '<') {
            unbalanced.push(brackets[i]);
        } else {
            const last = unbalanced.pop();
            if(last === undefined || last !== bracketPairsOpening[brackets[i]]) {            
                return brackets[i];
            }
        }
    }
    return null;
}

function autoComplete(brackets: Bracket[]): Bracket[] {
    const unbalanced: Bracket[] = [];
    for(let i = 0; i < brackets.length; i++) {
        if(brackets[i] === '[' || brackets[i] === '{' || brackets[i] === '(' || brackets[i] === '<') {
            unbalanced.push(brackets[i]);
        } else {
            unbalanced.pop();
        }
    }
    return unbalanced.map(b => bracketPairsClosing[b]).reverse();
}