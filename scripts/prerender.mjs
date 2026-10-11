import React from 'react';
import { renderToString } from 'react-dom/server';
import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';

const server = await createServer({
  configFile: './vite.config.ts',
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const renderedHtml = renderToString(React.createElement(App));

  const indexPath = './dist/index.html';
  const html = await readFile(indexPath, 'utf8');
  const placeholder = '<div id="root"></div>';

  if (!html.includes(placeholder)) {
    throw new Error('Could not find the root placeholder in dist/index.html');
  }

  const updatedHtml = html.replace(
    placeholder,
    `<div id="root">${renderedHtml}</div>`
  );

  await writeFile(indexPath, updatedHtml, 'utf8');
  console.log('Prerender successful.');
  console.log(`Generated homepage HTML: ${renderedHtml.length} characters.`);
} finally {
  await server.close();
}
