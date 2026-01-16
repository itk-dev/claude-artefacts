#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const artifactsDir = path.resolve(__dirname, '..', 'src', 'artifacts');

if (!fs.existsSync(artifactsDir)) {
  console.log('No artifacts found.');
  process.exit(0);
}

const artifacts = fs.readdirSync(artifactsDir).filter((name) => {
  const artifactPath = path.join(artifactsDir, name);
  return fs.statSync(artifactPath).isDirectory();
});

if (artifacts.length === 0) {
  console.log('No artifacts found.');
  process.exit(0);
}

console.log('\nAvailable Artifacts:\n');
console.log('─'.repeat(60));

artifacts.forEach((name) => {
  const metaPath = path.join(artifactsDir, name, 'meta.json');
  let meta = { name, description: 'No description' };

  if (fs.existsSync(metaPath)) {
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    } catch (e) {
      // Use defaults
    }
  }

  console.log(`\n  ${meta.name || name}`);
  console.log(`  ${'-'.repeat(meta.name?.length || name.length)}`);
  console.log(`  Path: src/artifacts/${name}/`);
  console.log(`  Description: ${meta.description || 'No description'}`);
  if (meta.tags?.length) {
    console.log(`  Tags: ${meta.tags.join(', ')}`);
  }
  if (meta.created) {
    console.log(`  Created: ${meta.created}`);
  }
});

console.log('\n' + '─'.repeat(60));
console.log(`\nTotal: ${artifacts.length} artifact(s)`);
