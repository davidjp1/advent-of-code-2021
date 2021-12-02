export function run(part: number, input: string[]): number {
    if(part === 1) {
        return part1(input);
    } else if (part === 2) {
        return part2(input);
    }
    throw new Error('Unknown part');
}

function part1(input: string[]): number {
    let depth = 0;
    let horizontalDistance = 0;
    input.map(line => {
        const [direction,distanceStr] = line.split(' ');
        const distance = parseInt(distanceStr);
        if (direction === 'up') {
            depth -= distance;
        } else if (direction === 'down') {
            depth += distance;
        } else if (direction === 'forward') {
            horizontalDistance += distance;
        }
    });
    return depth * horizontalDistance;
}
function part2(input: string[]): number {
    let aim = 0;
    let depth = 0;
    let horizontalDistance = 0;
    input.map(line => {
        const [direction,distanceStr] = line.split(' ');
        const distance = parseInt(distanceStr);
        if (direction === 'up') {
            aim -= distance;
        } else if (direction === 'down') {
            aim += distance;
        } else if (direction === 'forward') {
            horizontalDistance += distance;
            depth += aim * distance;
        }
    });
    return horizontalDistance * depth;
}