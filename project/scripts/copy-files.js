import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const distDir = resolve(rootDir, 'dist');

// Files to copy
const files = [
  ['manifest.json', 'manifest.json'],
  ['popup.html', 'popup.html'],
  ['styles.css', 'styles.css']
];

// Create icons directory structure
const iconDirs = ['icons'];
iconDirs.forEach(dir => {
  const fullPath = resolve(distDir, dir);
  if (!existsSync(fullPath)) {
    mkdirSync(fullPath, { recursive: true });
  }
});

// Copy icon files
const iconFiles = [
  ['icons/icon16.png', 'icons/icon16.png'],
  ['icons/icon48.png', 'icons/icon48.png'],
  ['icons/icon128.png', 'icons/icon128.png']
];

// Copy all files
[...files, ...iconFiles].forEach(([src, dest]) => {
  try {
    copyFileSync(
      resolve(rootDir, src),
      resolve(distDir, dest)
    );
    console.log(`Copied ${src} to dist/${dest}`);
  } catch (error) {
    console.error(`Error copying ${src}: ${error.message}`);
  }
});