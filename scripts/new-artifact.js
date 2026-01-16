#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const artifactName = process.argv[2];

if (!artifactName) {
  console.error('Usage: npm run new <artifact-name>');
  console.error('Example: npm run new my-dashboard');
  process.exit(1);
}

const slug = artifactName
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const artifactDir = path.join(rootDir, 'src', 'artifacts', slug);

if (fs.existsSync(artifactDir)) {
  console.error(`Artifact "${slug}" already exists!`);
  process.exit(1);
}

fs.mkdirSync(artifactDir, { recursive: true });
fs.mkdirSync(path.join(artifactDir, 'images'), { recursive: true });

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${artifactName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-type="module">
    // Image imports - use relative paths for local images
    // Example: const myImage = './images/my-image.png';

    function App() {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">${artifactName}</h1>

            {/* Example image usage */}
            {/* <img src="./images/example.png" alt="Example" className="rounded-lg shadow-md" /> */}

            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-slate-600">
                Start building your artifact here. You can use:
              </p>
              <ul className="mt-4 space-y-2 text-slate-600">
                <li>• React components</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Local images in the ./images folder</li>
                <li>• Shared assets from @assets or @images</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
`;

const cssTemplate = `/* Custom styles for ${artifactName} */

/* You can add custom CSS here that won't be covered by Tailwind */
`;

const metaTemplate = `{
  "name": "${artifactName}",
  "description": "Description of this artifact",
  "author": "",
  "created": "${new Date().toISOString().split('T')[0]}",
  "tags": [],
  "thumbnail": ""
}
`;

fs.writeFileSync(path.join(artifactDir, 'index.html'), htmlTemplate);
fs.writeFileSync(path.join(artifactDir, 'styles.css'), cssTemplate);
fs.writeFileSync(path.join(artifactDir, 'meta.json'), metaTemplate);

console.log(`✓ Created artifact: ${slug}`);
console.log(`  Location: src/artifacts/${slug}/`);
console.log(`  Files created:`);
console.log(`    - index.html (main artifact)`);
console.log(`    - styles.css (custom styles)`);
console.log(`    - meta.json (metadata)`);
console.log(`    - images/ (local images folder)`);
console.log(`\nRun 'npm run dev' and open http://localhost:5173/src/artifacts/${slug}/`);
