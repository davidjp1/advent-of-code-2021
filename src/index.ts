import fs from 'fs';
import path from 'path';
import * as rl from 'readline';

const readline = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserInput(question: string): Promise<string> {
    return new Promise((res) => {
        readline.question(question, (answer: string) => {
            res(answer);
        });
    });
}

(async () => {
    const day = await getUserInput('Pick a Day!\n').then(day => parseInt(day.replace(/[^0-9]/g, '')));
    const part = await getUserInput('Pick a Part!\n').then(part => parseInt(part.replace(/[^0-9]/g, '')));
    readline.close();

    try {
        const selected = require(`./day${day}/solution.ts`);
        const input = fs.readFileSync(path.resolve(__dirname, `./day${day}/part${part}.txt`), 'utf8').replace(/\r/g, '').split('\n');
        console.log(`Result:\n\n${selected.run(part, input)}`);
    } catch (e) {
        console.error('Error occurred running solution\n\n', e);
    }
})();
