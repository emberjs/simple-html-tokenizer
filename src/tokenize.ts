import Tokenizer from './tokenizer.js';
import EntityParser from './entity-parser.js';
import namedCharRefs from './generated/html5-named-char-refs.js';
import { TokenizerOptions, Token } from './types.js';

export default function tokenize(
  input: string,
  options?: TokenizerOptions
): Token[] {
  let tokenizer = new Tokenizer(new EntityParser(namedCharRefs), options);
  return tokenizer.tokenize(input);
}
