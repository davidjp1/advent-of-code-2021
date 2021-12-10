interface Cord {x: number, y: number}
interface Line {
    start: Cord;
    end: Cord;
}

export function run(part: number, input: string[]): number {
    const vents = preProcess(input);
    if(part === 1) {
        return calculateOverlaps(vents, false);
    }  
    if(part === 2) {
        return calculateOverlaps(vents, true);
    }
    throw Error(`Part ${part} not implemented`);
}

function calculateOverlaps(vents: Line[], diagonals: boolean): number {
    const visitedCoords: {[coord: string]: number} = {};
    vents.forEach(v => {
        findAllCoordsOnLine(v.start, v.end, diagonals)
            .forEach(c => visitedCoords[c.y + ',' + c.x] = (visitedCoords[c.y + ',' + c.x] || 0) + 1);
    });
    return Object.values(visitedCoords).filter(v => v > 1).length;
}

function findAllCoordsOnLine(start: Cord, end: Cord, diagonals: boolean): Cord[] {
    if(!diagonals && start.x !== end.x && start.y !== end.y) {
        return [];
    }
    const coords: Cord[] = [];
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    for(let i = 0; i <= steps; i++) {
        coords.push({
            x: start.x + (dx / steps) * i,
            y: start.y + (dy / steps) * i
        });
    }
    return diagonals ? coords : coords.filter(c => c.x === start.x || c.y === start.y);
}

function preProcess(input: string[]): Line[] {
    return input.map(line => {
        const [startStr,endStr] = line.split(' -> ');
        const [startX,startY] = startStr.split(',').map(x => parseInt(x));
        const [endX,endY] = endStr.split(',').map(x => parseInt(x));
        
        return {
            start: {x: startX, y: startY},
            end: {x: endX, y: endY}
        };
    });
}