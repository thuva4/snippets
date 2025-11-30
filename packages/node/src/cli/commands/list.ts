import { listThemes, listPresets } from '../../index.js';
import chalk from 'chalk';

export function listCommand(type: string) {
    const typeMap: Record<string, () => string[]> = {
        'themes': listThemes,
        'presets': listPresets,
    };

    const listFn = typeMap[type.toLowerCase()];

    if (!listFn) {
        console.error(chalk.red(`Error: Unknown type "${type}"`));
        console.log(chalk.yellow('Available types: themes, presets'));
        process.exit(1);
    }

    const items = listFn();

    console.log(chalk.bold(`\nAvailable ${type}:`));
    items.forEach(item => {
        console.log(chalk.cyan(`  • ${item}`));
    });
    console.log();
}
