import fs from 'fs/promises';
import { createSnippet } from '../../index.js';
import chalk from 'chalk';
import ora from 'ora';

interface GenerateOptions {
    output: string;
    language?: string;
    theme?: string;
    windowTheme?: string;
    preset?: string;
    format?: string;
    lineNumbers?: boolean;
    highlight?: string;
    width?: number;
    padding?: number;
    margin?: number;
    fileName?: string;
}

export async function generateCommand(file: string | undefined, options: GenerateOptions) {
    const spinner = ora('Generating snippet...').start();

    try {
        let code: string;
        let detectedLanguage: string | undefined;

        if (file) {
            code = await fs.readFile(file, 'utf-8');
            detectedLanguage = detectLanguage(file);
            spinner.text = `Generating snippet from ${chalk.cyan(file)}...`;
        } else {
            code = await readStdin();
            if (!code.trim()) {
                spinner.fail(chalk.red('Error: No input provided'));
                console.log(chalk.yellow('Tip: Provide a file or pipe code via stdin'));
                console.log(chalk.gray('  Examples:'));
                console.log(chalk.gray('    snippets generate code.js -o output.png'));
                console.log(chalk.gray('    cat code.js | snippets generate -l javascript -o output.png'));
                process.exit(1);
            }
            spinner.text = 'Generating snippet from stdin...';
        }

        const language = options.language || detectedLanguage;
        if (!language) {
            spinner.fail(chalk.red('Error: Language not specified'));
            console.log(chalk.yellow('Tip: Use -l or --language to specify the programming language'));
            console.log(chalk.gray('  Example: snippets generate -l javascript -o output.png'));
            process.exit(1);
        }

        const builder = createSnippet()
            .code(code)
            .language(language as any);

        if (options.preset) {
            builder.preset(options.preset);
        }

        if (options.theme) builder.theme(options.theme as any);
        if (options.windowTheme) builder.windowTheme(options.windowTheme as any);
        if (options.width) builder.width(options.width);
        if (options.padding !== undefined) builder.padding(options.padding as any);
        if (options.margin !== undefined) builder.margin(options.margin as any);
        if (options.fileName) builder.fileName(options.fileName);
        if (options.lineNumbers) builder.lineNumbers(true);
        if (options.highlight) builder.highlightLines(options.highlight);

        const format = options.format?.toLowerCase() || 'png';

        if (format) {
            builder.format(format as any);
        }

        const buffer = await builder.generate();

        let outputPath = options.output;
        if (format !== 'png' && !outputPath.endsWith(`.${format}`)) {
            outputPath = outputPath.replace(/\.[^.]+$/, `.${format}`);
        }

        await fs.writeFile(outputPath, buffer);

        spinner.succeed(chalk.green(`Snippet generated: ${chalk.cyan(outputPath)}`));

        console.log(chalk.gray(`  Language: ${language}`));
        console.log(chalk.gray(`  Format: ${format.toUpperCase()}`));
        if (options.preset) console.log(chalk.gray(`  Preset: ${options.preset}`));
        if (options.theme) console.log(chalk.gray(`  Theme: ${options.theme}`));

    } catch (error) {
        spinner.fail(chalk.red('Error generating snippet'));
        console.error(chalk.red((error as Error).message));
        process.exit(1);
    }
}

function detectLanguage(filePath: string): string | undefined {
    const ext = filePath.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
        'js': 'javascript',
        'ts': 'typescript',
        'jsx': 'jsx',
        'tsx': 'tsx',
        'py': 'python',
        'rb': 'ruby',
        'go': 'go',
        'rs': 'rust',
        'java': 'java',
        'cpp': 'cpp',
        'c': 'c',
        'cs': 'csharp',
        'php': 'php',
        'swift': 'swift',
        'kt': 'kotlin',
        'sh': 'bash',
        'yaml': 'yaml',
        'yml': 'yaml',
        'json': 'json',
        'md': 'markdown',
        'html': 'html',
        'css': 'css',
        'scss': 'scss',
        'sql': 'sql',
    };
    return ext ? languageMap[ext] : undefined;
}

async function readStdin(): Promise<string> {
    return new Promise((resolve) => {
        let data = '';

        if (process.stdin.isTTY) {
            resolve('');
            return;
        }

        process.stdin.setEncoding('utf-8');
        process.stdin.on('data', (chunk) => {
            data += chunk;
        });
        process.stdin.on('end', () => {
            resolve(data);
        });
    });
}
