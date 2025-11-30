import { SnippetOptions } from '../types';
import './ControlPanel.css';

interface Props {
    options: Omit<SnippetOptions, 'language'>;
    onOptionChange: <K extends keyof Omit<SnippetOptions, 'language'>>(
        key: K,
        value: Omit<SnippetOptions, 'language'>[K]
    ) => void;
}

const THEMES = [
    'vercel', 'supabase', 'tailwind',
    'cyberpunk', 'sunset', 'ocean', 'forest', 'aurora',
    'dracula', 'monokai', 'nord', 'matrix', 'synthwave',
    'coffee', 'nebula', 'night-owl', 'tokyo-night'
];


const PADDINGS = [0, 16, 32, 64, 128];

export function ControlPanel({ options, onOptionChange }: Props) {
    return (
        <div className="control-panel">
            <div className="control-group">
                <label>Theme</label>
                <select
                    value={typeof options.theme === 'string' ? options.theme : 'custom'}
                    onChange={(e) => {
                        const themeName = e.target.value;
                        onOptionChange('theme', themeName);
                        onOptionChange('windowTheme', themeName as SnippetOptions['windowTheme']);
                    }}
                >
                    {typeof options.theme !== 'string' && (
                        <option value="custom">Custom Theme</option>
                    )}
                    {THEMES.map((theme) => (
                        <option key={theme} value={theme}>
                            {theme}
                        </option>
                    ))}
                </select>
            </div>

            <div className="control-group">
                <label>Padding</label>
                <div className="button-group">
                    {PADDINGS.map((p) => (
                        <button
                            key={p}
                            className={`btn-small ${options.padding === p ? 'active' : ''}`}
                            onClick={() => onOptionChange('padding', p as any)}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            <div className="control-group">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={options.showLineNumbers}
                        onChange={(e) => onOptionChange('showLineNumbers', e.target.checked)}
                    />
                    Line numbers
                </label>
            </div>


        </div>
    );
}
