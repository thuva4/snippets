// @ts-ignore
export type { SnippetOptions } from '../../../../packages/browser/src/index';

// @ts-ignore
import type { CodeColumn as CoreCodeColumn } from '../../../../packages/browser/src/index';

export type CodeColumn = CoreCodeColumn & {
    id: string;
};
