#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');

const ROBOTS_META = '<meta name="robots" content="noindex, nofollow">';
const BANNER_HTML = `<div style="background: #fef3c7; color: #92400e; text-align: center; padding: 8px 16px; font-size: 13px; font-family: system-ui, sans-serif;">
    This is a prototype for idea generation and not a real product
  </div>`;

function injectBanner() {
  // Find all artifact HTML files in dist (exclude the main index.html)
  const artifactFiles = globSync('src/artifacts/**/index.html', { cwd: distDir });

  if (artifactFiles.length === 0) {
    console.log('No artifact HTML files found in dist');
    return;
  }

  let injectedCount = 0;

  artifactFiles.forEach((file) => {
    const filePath = path.join(distDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // Inject robots meta tag if not present
    if (!content.includes('name="robots"')) {
      content = content.replace(
        /<meta name="viewport"[^>]*>/,
        (match) => `${match}\n  ${ROBOTS_META}`
      );
      modified = true;
    }

    // Inject banner if not present (check for the specific background color)
    if (!content.includes('background: #fef3c7') && !content.includes('background:#fef3c7')) {
      content = content.replace(
        /<body>/,
        `<body>\n  ${BANNER_HTML}`
      );
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      injectedCount++;
      console.log(`Injected banner into: ${file}`);
    } else {
      console.log(`Already has banner: ${file}`);
    }
  });

  console.log(`\nProcessed ${artifactFiles.length} artifact(s), injected into ${injectedCount}`);
}

injectBanner();
