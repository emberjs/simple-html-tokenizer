import codegen from './codegen.js';
import tokenizerStates from './codegen/tokenizer-states.js';

await codegen(
  'w3c',
  'html',
  'master',
  'sections/syntax.include',
  new URL('../src/generated/tokenizer-states.ts', import.meta.url),
  tokenizerStates
);
