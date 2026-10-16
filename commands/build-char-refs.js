import codegen from './codegen.js';
import entities from './codegen/entities.js';

await codegen(
  'w3c',
  'html',
  'master',
  'entities.json',
  new URL('../src/generated/html5-named-char-refs.ts', import.meta.url),
  entities
);
