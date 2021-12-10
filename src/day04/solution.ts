export function run(part: number, input: string[]): number {
    if(part === 1) {
        return calculateBestBoard(input, Number.MAX_VALUE, (a,b) => a > b);
    }    
    if(part === 2) {
        return calculateBestBoard(input, 0, (a,b) => a < b);
    }
    throw Error(`Part ${part} not implemented`);
}

function calculateBestBoard(input: string[], worstCaseTime: number, comparison: (previousBestTime: number, currentTime: number) => boolean){
    const [numbers, bingoCards] = preProcess(input);
    let bestTime = worstCaseTime;
    let bestCard = bingoCards[0];
    bingoCards.forEach(card => {
        const timeToComplete = attemptCard(card, numbers);
        if(comparison(bestTime, timeToComplete)){
            bestTime = timeToComplete;
            bestCard = card;
        }
    });
    return boardScore(bestCard, numbers.slice(0,bestTime));
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
