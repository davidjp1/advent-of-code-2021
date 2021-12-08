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
    const [numbers, bingoCards] = preProcess(input);
    let fastestTime = Number.MAX_VALUE;
    let fastestCard = bingoCards[0];
    bingoCards.forEach(card => {
        const timeToComplete = attemptCard(card, numbers);
        if(timeToComplete < fastestTime){
            fastestTime = timeToComplete;
            fastestCard = card;
        }
    });
    return boardScore(fastestCard, numbers.slice(0,fastestTime));
}

function part2(input: string[]): number {
    const [numbers, bingoCards] = preProcess(input);
    let slowestTime = 0;
    let slowestCard = bingoCards[0];
    bingoCards.forEach(card => {
        const timeToComplete = attemptCard(card, numbers);
        if(timeToComplete > slowestTime){
            slowestTime = timeToComplete;
            slowestCard = card;
        }
    });
    return boardScore(slowestCard, numbers.slice(0,slowestTime));
}


function attemptCard(card: number[][], numbers: number[]): number {
    const expandedCard: number[][] = JSON.parse(JSON.stringify(card));    
    const transposed = expandedCard.map((_, i) => expandedCard.map(line => line[i]));
    transposed.forEach(t => expandedCard.push(t));
    
    for(let i = 0; i < numbers.length; i++) {
        for(const line of expandedCard){
            if(line.every(num => numbers.slice(0, i).includes(num))){
                return i;
            }
        }
    }
    return Number.MAX_VALUE;
}

function boardScore(board: number[][], completedNumbers: number[]): number {
    return completedNumbers[completedNumbers.length - 1] * board.flat().reduce((a,b) => a + (completedNumbers.includes(b) ? 0 : b), 0);
}


function preProcess(input: string[]): [number[],  number[][][]] {
    const numbers: number[] = input[0].split(',').map(n => parseInt(n,10));

    const cards: number[][][] = [];
    let currentCard: number[][] = [];
    input.forEach((line,i) => {
        if(i < 2){
            return;
        }
        if(line.replace(/\n/g, '').length === 0) {
            currentCard.length > 0 && cards.push([...currentCard]);
            currentCard = [];
        } else {
            const lineNumbers = line.replace(/^[ ]+/g, '').split(/\s+/g).map(n => parseInt(n,10));
            currentCard.push(lineNumbers);
        }
    });
    currentCard.length !== 0 && cards.push([...currentCard]);
    return [numbers, cards];
}
