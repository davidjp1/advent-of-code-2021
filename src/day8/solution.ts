export function run(part: number, input: string[]): number {
    const processed = input.map(a => {
        const [inputRaw,outputRaw] = a.split(' | ');
        return {inputs: inputRaw.split(' '), outputs: outputRaw.split(' ')};
    });
    if(part === 1){
        return part1(processed);
    }
    if(part === 2){
        return part2(processed);
    }
    throw Error(`Part ${part} not implemented`);
}

function part1(data: {inputs: string[], outputs: string[]}[]) : number {
    const occurences: {[digit: number]: number} = {};
    data.map(d => {
        const digits = deriveDigits(d.inputs);
        d.outputs.map(output => {
            const number = digits.indexOf(sortedString(output));
            occurences[number] = (occurences[number] || 0) + 1;
        });
    });
    return occurences[1] + occurences[4] + occurences[7] + occurences[8];
}

function part2(data: {inputs: string[], outputs: string[]}[]) : number {
    return data.map(d => {
        const digits = deriveDigits(d.inputs);
        const outputValues = d.outputs.map(output => {
            const number = digits.indexOf(sortedString(output));
            return number;
        });
        return Number.parseInt(outputValues.join(''), 10);
    }).reduce((a, b) => a + b);
}

function deriveDigits(inputs: string[]): string[] {
    const one = inputs.find(i => i.length === 2);
    const seven = inputs.find(i => i.length === 3);
    const four = inputs.find(i => i.length === 4);
    const eight = inputs.find(i => i.length === 7);
    const nine = inputs.find(i => i.length === 6 && [...four as string].every(c => i.includes(c)));
    const zero = inputs.find(i => i.length === 6 && [...seven as string].every(c => i.includes(c)) && i !== nine);
    const six = inputs.find(i => i.length === 6 && i !== nine && i !== zero);
    const two = inputs.find(i => i.length === 5 && ![...i as string].every(c => (nine as string).includes(c)));
    const five = inputs.find(i => i.length === 5 && i !== two && [...i as string].every(c => (six as string).includes(c)));
    const three = inputs.find(i => i.length === 5 && i !== two && i !== five);

    return [zero, one, two, three, four, five, six, seven, eight, nine].map(a => sortedString(a));
}

function sortedString(inputs?: string): string {
    return (inputs || '').split('').sort().join('');
}
