import { Command } from 'commander';
import { generateCommand } from './commands/generate.js';
import { listCommand } from './commands/list.js';

const program = new Command();

program
    .name('snippets')
    .description('Generate beautiful code snippet images')
    .version('2.0.0');

program
    .command('generate')
    .description('Generate a code snippet image')
    .argument('[file]', 'Code file to generate snippet from (or use stdin)')
    .option('-o, --output <path>', 'Output file path', 'output.png')
    .option('-l, --language <lang>', 'Programming language')
    .option('-t, --theme <name>', 'Code theme', 'github-dark')
    .option('-w, --window-theme <name>', 'Window theme', 'default')
    .option('-p, --preset <name>', 'Use a preset configuration')
    .option('--format <format>', 'Output format (png, svg, pdf)', 'png')
    .option('--line-numbers', 'Show line numbers')
    .option('--highlight <lines>', 'Highlight specific lines (e.g., "1,3,5-7")')
    .option('--width <number>', 'Image width', parseInt)
    .option('--padding <number>', 'Padding inside window', parseInt)
    .option('--margin <number>', 'Margin outside window', parseInt)
    .option('--file-name <name>', 'Display file name in window')
    .action(generateCommand);

program
    .command('list')
    .description('List available options')
    .argument('<type>', 'Type to list (themes, presets, renderers, exporters)')
    .action(listCommand);

program.parse();
