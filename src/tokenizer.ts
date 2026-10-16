import EventedTokenizer from './evented-tokenizer.js';
import {
  Attribute,
  EntityParser,
  Token,
  TokenizerDelegate,
  TokenMap,
  TokenType,
  TokenizerOptions
} from './types.js';

export default class Tokenizer implements TokenizerDelegate {
  private token: Token | null = null;
  private startLine = 1;
  private startColumn = 0;
  private tokenizer: EventedTokenizer;
  private tokens: Token[] = [];
  private _currentAttribute?: Attribute;

  constructor(
    entityParser: EntityParser,
    private options: TokenizerOptions = {}
  ) {
    this.tokenizer = new EventedTokenizer(this, entityParser, options.mode);
    this._currentAttribute = undefined;
  }

  tokenize(input: string) {
    this.tokens = [];
    this.tokenizer.tokenize(input);
    return this.tokens;
  }

  tokenizePart(input: string) {
    this.tokens = [];
    this.tokenizer.tokenizePart(input);
    return this.tokens;
  }

  tokenizeEOF() {
    this.tokens = [];
    this.tokenizer.tokenizeEOF();
    return this.tokens[0];
  }

  reset() {
    this.token = null;
    this.startLine = 1;
    this.startColumn = 0;
  }

  current<T extends TokenType, U extends TokenType>(
    type1: T,
    type2: U
  ): TokenMap[T] | TokenMap[U];
  current<T extends TokenType>(type: T): TokenMap[T];
  current(): Token;
  current(): Token {
    const token = this.token;
    if (token === null) {
      throw new Error('token was unexpectedly null');
    }
    if (arguments.length === 0) {
      return token;
    }
    for (let i = 0; i < arguments.length; i++) {
      if (token.type === arguments[i]) {
        return token;
      }
    }
    throw new Error(`token type was unexpectedly ${token.type}`);
  }

  push(token: Token) {
    this.token = token;
    this.tokens.push(token);
  }

  currentAttribute() {
    return this._currentAttribute;
  }

  addLocInfo() {
    if (this.options.loc) {
      this.current().loc = {
        start: {
          line: this.startLine,
          column: this.startColumn
        },
        end: {
          line: this.tokenizer.line,
          column: this.tokenizer.column
        }
      };
    }
    this.startLine = this.tokenizer.line;
    this.startColumn = this.tokenizer.column;
  }

  // Data

  beginDoctype() {
    this.push({
      type: 'Doctype',
      name: '',
    });
  }

  appendToDoctypeName(char: string) {
    this.current('Doctype').name += char;
  }

  appendToDoctypePublicIdentifier(char: string) {
    let doctype = this.current('Doctype');

    if (doctype.publicIdentifier === undefined) {
      doctype.publicIdentifier = char;
    } else {
      doctype.publicIdentifier += char;
    }
  }

  appendToDoctypeSystemIdentifier(char: string) {
    let doctype = this.current('Doctype');

    if (doctype.systemIdentifier === undefined) {
      doctype.systemIdentifier = char;
    } else {
      doctype.systemIdentifier += char;
    }
  }

  endDoctype() {
    this.addLocInfo();
  }

  beginData() {
    this.push({
      type: 'Chars',
      chars: ''
    });
  }

  appendToData(char: string) {
    this.current('Chars').chars += char;
  }

  finishData() {
    this.addLocInfo();
  }

  // Comment

  beginComment() {
    this.push({
      type: 'Comment',
      chars: ''
    });
  }

  appendToCommentData(char: string) {
    this.current('Comment').chars += char;
  }

  finishComment() {
    this.addLocInfo();
  }

  // Tags - basic

  tagOpen() {}

  beginStartTag() {
    this.push({
      type: 'StartTag',
      tagName: '',
      attributes: [],
      selfClosing: false
    });
  }

  beginEndTag() {
    this.push({
      type: 'EndTag',
      tagName: ''
    });
  }

  finishTag() {
    this.addLocInfo();
  }

  markTagAsSelfClosing() {
    this.current('StartTag').selfClosing = true;
  }

  // Tags - name
  appendToTagName(char: string) {
    this.current('StartTag', 'EndTag').tagName += char;
  }

  // Tags - attributes

  beginAttribute() {
    this._currentAttribute = ['', '', false];
  }

  appendToAttributeName(char: string) {
    this.currentAttribute()![0] += char;
  }

  beginAttributeValue(isQuoted: boolean) {
    this.currentAttribute()![2] = isQuoted;
  }

  appendToAttributeValue(char: string) {
    this.currentAttribute()![1] += char;
  }

  finishAttributeValue() {
    this.current('StartTag').attributes.push(this._currentAttribute!);
  }

  reportSyntaxError(message: string) {
    this.current().syntaxError = message;
  }
}
