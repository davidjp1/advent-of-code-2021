interface Coordinate {
    x: number;
    y: number;
}

export function run(part: number, input: string[]): number {
    const heatMap = input.map(a => a.split('').map(a => Number.parseInt(a, 10)));
    if(part === 1){
        return part1(heatMap);
    }
    if(part === 2){
        return part2(heatMap);
    }
    throw Error(`Part ${part} not implemented`);
}

function part1(heatMap: number[][]) : number {
    const lowPoints = getLowPoints(heatMap);
    return lowPoints.reduce((a, b) => a + heatMap[b.y][b.x], 0) + lowPoints.length;
}

function part2(heatMap: number[][]) : number {
    const lowPoints = getLowPoints(heatMap);
    return lowPoints.map(coord => getBasinSize(heatMap, coord.x, coord.y))
        .map(a => a.length)
        .sort((a,b) => b - a)
        .slice(0,3)
        .reduce((a, b) => a * b, 1);
}

function getBasinSize(grid: number[][], x: number, y: number): string[] {
    if(grid[y][x] === 9) return [];
    let basinCoords = [`${x},${y}`];
    if(y + 1 < grid.length && grid[y + 1][x] > grid[y][x]){
        basinCoords = basinCoords.concat(getBasinSize(grid, x, y + 1));
    }
    if(x + 1 < grid[0].length && grid[y][x + 1] > grid[y][x]){
        basinCoords = basinCoords.concat(getBasinSize(grid, x + 1, y));
    }
    if(y > 0 && grid[y - 1][x] > grid[y][x]){
        basinCoords = basinCoords.concat(getBasinSize(grid, x, y - 1));
    }
    if(x > 0 && grid[y][x - 1] > grid[y][x]){
        basinCoords = basinCoords.concat(getBasinSize(grid, x - 1, y));
    }
    return [...new Set(basinCoords)];
}

function getLowPoints(heatMap: number[][]): Coordinate[] {
    const lowPoints = [];
    for(let y = 0; y < heatMap.length; y++){
        for(let x = 0; x < heatMap[y].length; x++){
            const point = heatMap[y][x];
            const neighbours = getNeighbours(heatMap,x,y);
            if(neighbours.every(n => n > point)){
                lowPoints.push({y, x});
            }
        }
    }
    return lowPoints;
}

function getNeighbours(grid: number[][], x: number, y: number): number[] {
    const neighbours = [];
    for(let yy = y - 1; yy <= y + 1; yy++){
        for(let xx = x - 1; xx <= x + 1; xx++){
            if(yy === y && xx === x) continue;
            if(yy < 0 || xx < 0) continue;
            if(yy >= grid.length || xx >= grid[y].length) continue;
            if(yy !== y && xx !== x) continue;
            neighbours.push(grid[yy][xx]);
        }
    }
    return neighbours;
}