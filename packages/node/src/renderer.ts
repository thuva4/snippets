import { generateSnippetHTML, SnippetOptions } from '@thuva4/snippets-core';
import { BrowserManager } from './BrowserManager.js';
import fs from 'fs/promises';


export interface GenerateOptions extends SnippetOptions {
  output?: string;
  scale?: number;
}

export async function generateImage(options: GenerateOptions) {
  const {
    output,
    width,
    scale = 2,
    format = 'png',
  } = options;

  const snippetHTML = await generateSnippetHTML(options);
  const imageWidth = width || 1000;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Roboto+Mono:wght@400&display=swap" rel="stylesheet">
      <style>
        body {
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: ${imageWidth}px;
        }
      </style>
    </head>
    <body>
      ${snippetHTML}
    </body>
    </html>
  `;

  const browserManager = BrowserManager.getInstance();

  try {
    const page = await browserManager.newPage();
    await page.setViewport({
      width: imageWidth,
      height: 800,
      deviceScaleFactor: scale
    });
    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    await page.evaluateHandle('document.fonts.ready');

    let result: Buffer | Uint8Array;

    if (format === 'pdf') {
      result = await page.pdf({
        printBackground: true,
        width: imageWidth + 'px',
        margin: {
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      });
    } else {
      const element = await page.$('.snippet-container');
      if (!element) {
        throw new Error('Could not find element to capture');
      }
      result = await element.screenshot({ type: format as 'png' | 'jpeg' | 'webp' });
    }

    await page.close();

    if (output) {
      await fs.writeFile(output, result);
    }

    return result;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}


