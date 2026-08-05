#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(process.argv[2] || path.join(__dirname, '..'));
const templatesDir = path.join(root, 'templates');
const jsDir = path.join(root, 'js');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(fullPath);
    }
    return entry.isFile() && entry.name.endsWith('.php') ? [fullPath] : [];
  });
}

function extractScripts(content) {
  const scripts = [];
  const scriptCallPattern = /script\s*\(\s*['"]gestion['"]\s*,\s*array\s*\(([^)]*)\)\s*\)/gs;
  let match;

  while ((match = scriptCallPattern.exec(content)) !== null) {
    const scriptNamePattern = /['"]([^'"]+)['"]/g;
    let scriptMatch;

    while ((scriptMatch = scriptNamePattern.exec(match[1])) !== null) {
      scripts.push(scriptMatch[1]);
    }
  }

  return scripts;
}

const missingScripts = [];

for (const template of walk(templatesDir)) {
  const relativeTemplate = path.relative(root, template);
  const scripts = extractScripts(fs.readFileSync(template, 'utf8'));

  for (const script of scripts) {
    const fileName = script.endsWith('.js') ? script : `${script}.js`;
    const scriptPath = path.join(jsDir, fileName);

    if (!fs.existsSync(scriptPath)) {
      missingScripts.push(`${relativeTemplate}: ${fileName}`);
    }
  }
}

if (missingScripts.length > 0) {
  console.error(`Templates in ${root} reference JavaScript files that are missing from ${jsDir}:`);
  for (const missingScript of missingScripts) {
    console.error(`- ${missingScript}`);
  }
  process.exit(1);
}

console.log(`All JavaScript files referenced by templates exist in ${jsDir}.`);
