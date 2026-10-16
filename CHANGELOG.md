# Changelog

## Release (2026-10-16)

* simple-html-tokenizer 1.0.0 (major)

#### :boom: Breaking Change
* `simple-html-tokenizer`
  * [#124](https://github.com/emberjs/simple-html-tokenizer/pull/124) Rerun code generation scripts ([@ef4](https://github.com/ef4))
  * [#123](https://github.com/emberjs/simple-html-tokenizer/pull/123) Replace TokenType and TokenizerState enums with literal union types ([@ef4](https://github.com/ef4))
  * [#122](https://github.com/emberjs/simple-html-tokenizer/pull/122) Publish only es modules ([@ef4](https://github.com/ef4))
  * [#120](https://github.com/emberjs/simple-html-tokenizer/pull/120) bump minimum node version to 20.19 ([@ef4](https://github.com/ef4))
  * [#115](https://github.com/emberjs/simple-html-tokenizer/pull/115) Decode numeric character references the way HTML parsers do ([@ef4](https://github.com/ef4))

#### :rocket: Enhancement
* `simple-html-tokenizer`
  * [#115](https://github.com/emberjs/simple-html-tokenizer/pull/115) Decode numeric character references the way HTML parsers do ([@ef4](https://github.com/ef4))

#### :bug: Bug Fix
* `simple-html-tokenizer`
  * [#114](https://github.com/emberjs/simple-html-tokenizer/pull/114) allow elements to start with non-alpha chars to align with js vars ([@patricklx](https://github.com/patricklx))

#### :house: Internal
* `simple-html-tokenizer`
  * [#121](https://github.com/emberjs/simple-html-tokenizer/pull/121) Cleanup leftover release-it references ([@ef4](https://github.com/ef4))
  * [#119](https://github.com/emberjs/simple-html-tokenizer/pull/119) CI improvements ([@ef4](https://github.com/ef4))
  * [#117](https://github.com/emberjs/simple-html-tokenizer/pull/117) Adding release plan ([@ef4](https://github.com/ef4))
  * [#116](https://github.com/emberjs/simple-html-tokenizer/pull/116) Switch to pnpm ([@ef4](https://github.com/ef4))

#### Committers: 2
- Edward Faulkner ([@ef4](https://github.com/ef4))
- Patrick Pircher ([@patricklx](https://github.com/patricklx))

## v0.5.11 (2021-02-03)

#### :rocket: Enhancement
* [#71](https://github.com/tildeio/simple-html-tokenizer/pull/71) Add support for parsing `<!DOCTYPE html>` ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))


## v0.5.10 (2020-10-14)

#### :bug: Bug Fix
* [#90](https://github.com/tildeio/simple-html-tokenizer/pull/90) Add codemod mode to support `<pre>\nhi</pre>` stability in codemods. ([@rwjblue](https://github.com/rwjblue))

#### :house: Internal
* [#92](https://github.com/tildeio/simple-html-tokenizer/pull/92) Remove TravisCI setup. ([@rwjblue](https://github.com/rwjblue))
* [#91](https://github.com/tildeio/simple-html-tokenizer/pull/91) Add basic release automation. ([@rwjblue](https://github.com/rwjblue))

#### Committers: 1
- Robert Jackson ([@rwjblue](https://github.com/rwjblue))


