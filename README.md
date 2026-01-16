# Claude Artifacts Gallery

A repository for storing and serving Claude-style artifacts via GitHub Pages with full image support.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Create a new artifact
npm run new my-artifact-name

# List all artifacts
npm run list

# Build for production
npm run build
```

## Structure

```
claude-artefacts/
├── src/
│   ├── artifacts/           # All artifacts live here
│   │   └── my-artifact/
│   │       ├── index.html   # Main artifact file
│   │       ├── styles.css   # Custom styles
│   │       ├── meta.json    # Metadata (name, description, tags)
│   │       └── images/      # Local images for this artifact
│   └── assets/
│       └── images/          # Shared images across artifacts
├── public/                  # Static files copied to dist
├── scripts/                 # Build and utility scripts
└── index.html              # Gallery homepage
```

## Creating Artifacts

### Option 1: Use the CLI

```bash
npm run new "My Dashboard"
```

This creates a new artifact with all necessary files.

### Option 2: Copy from Claude

When Claude generates an artifact:

1. Create a folder in `src/artifacts/your-artifact-name/`
2. Create `index.html` with the artifact code
3. Add images to the `images/` subfolder
4. Update `meta.json` with metadata

### Option 3: Direct Paste

If you have HTML from Claude, paste it into a new `index.html` file. The template includes:
- React 18 via CDN
- Tailwind CSS
- Babel for JSX transformation

## Using Images

### Local Images (per artifact)

Place images in `src/artifacts/your-artifact/images/` and reference them:

```html
<img src="./images/my-image.png" alt="Description" />
```

### Shared Images

Place images in `src/assets/images/` and reference them:

```html
<img src="../../assets/images/shared-logo.png" alt="Logo" />
```

### External Images

You can also use URLs:

```html
<img src="https://example.com/image.png" alt="External" />
```

## Artifact Metadata

Each artifact has a `meta.json` file:

```json
{
  "name": "My Artifact",
  "description": "What this artifact does",
  "author": "Your Name",
  "created": "2026-01-16",
  "tags": ["dashboard", "charts"],
  "thumbnail": "images/thumbnail.png"
}
```

The thumbnail is optional and will be displayed in the gallery.

## Deployment

### Automatic (GitHub Actions)

Push to `main` branch and GitHub Actions will:
1. Build the project
2. Deploy to GitHub Pages

### Manual

```bash
npm run build
# Deploy the dist/ folder
```

## GitHub Pages Setup

1. Push this repository to GitHub
2. Go to Settings > Pages
3. Set Source to "GitHub Actions"
4. The workflow will deploy automatically on push to main

## Development

```bash
# Start dev server with hot reload
npm run dev

# Rebuild the artifact index
npm run index

# Preview production build
npm run preview
```

## Tips

- Each artifact is self-contained and can work independently
- Use Tailwind CSS classes for consistent styling
- The gallery auto-discovers all artifacts in `src/artifacts/`
- Tags help with filtering in the gallery view
