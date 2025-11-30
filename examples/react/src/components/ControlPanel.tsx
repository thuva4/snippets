import { SnippetOptions } from '../types';
import './ControlPanel.css';

interface Props {
    options: Omit<SnippetOptions, 'language'>;
    onOptionChange: <K extends keyof Omit<SnippetOptions, 'language'>>(
        key: K,
        value: Omit<SnippetOptions, 'language'>[K]
    ) => void;
    onDownload: () => void;
}

const THEMES = [
    'vercel', 'supabase', 'tailwind',
    'cyberpunk', 'sunset', 'ocean', 'forest', 'aurora',
    'dracula', 'monokai', 'nord', 'matrix', 'synthwave',
    'coffee', 'nebula', 'night-owl', 'tokyo-night'
];

const PADDINGS = [0, 16, 32, 64, 128];

export function ControlPanel({ options, onOptionChange, onDownload }: Props) {
    return (
        <div className="floating-toolbar">
            {/* Left: Visual Settings */}
            <div className="toolbar-section toolbar-left">
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
                                {theme.charAt(0).toUpperCase() + theme.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* <div className="control-group">
                    <label>Background</label>
                    <button
                        className={`btn-toggle ${options.background ? 'active' : ''}`}
                        onClick={() => onOptionChange('background', !options.background)}
                        title={options.background ? 'Hide background' : 'Show background'}
                    >
                        {options.background ? (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                        )}
                    </button>
                </div> */}
            </div>

            {/* Middle: Layout Settings */}
            <div className="toolbar-section toolbar-middle">
                <div className="control-group">
                    <label>Padding ({options.padding})</label>
                    <div className="segmented-control">
                        {PADDINGS.map((p) => (
                            <button
                                key={p}
                                className={`segment ${options.padding === p ? 'active' : ''}`}
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
                        <span>Line Numbers</span>
                    </label>
                </div>
            </div>

            <div className="toolbar-section toolbar-right">
                <button onClick={onDownload} className="btn-export">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Export
                </button>
            </div>
        </div>
    );
}
