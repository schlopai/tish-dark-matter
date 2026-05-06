# @schlopai/tish-dark-matter

A modular, [`gray-matter`](https://www.npmjs.com/package/gray-matter) compatible frontmatter parser for Tish and JavaScript.

## Features

- Extracts YAML, TOML, and JSON frontmatter from strings.
- Gray-matter compatible API (`matter(string, options)`).
- Supports MDX via `language: 'mdx'` or `.mdx` files by treating it the same as `.md`.
- Exported as both a JS library and native `.tish` code.
- **No runtime npm dependencies**: default YAML/TOML handling uses the same Tish implementation as native builds (`src/engines.tish`), compiled to `dist/engines.js` for the JS entry.

## Supported syntax (default engines)

Default parsing is **not** full YAML 1.2 or full TOML. It matches typical **flat** gray-matter frontmatter:

- **YAML**: one `key: value` per line; strings (quoted or plain), booleans, `null`/`~`, integers/decimals/scientific notation; `#` line comments and blank lines ignored.
- **TOML** (`+++` blocks): one `key = value` per line; basic strings (`"` with common escapes, `'` literals with `''` for a single quote), booleans, numbers; `#` comments and blank lines ignored.
- **JSON**: standard `JSON.parse` / `JSON.stringify`.

Nested maps, anchors, multiline block scalars, and other advanced YAML/TOML features are **not** supported unless you supply your own `engines` override.

## Tish-only consumers

Import the native module directly (see `package.json` export `./engines.tish`):

```tish
import { parseYamlFrontmatter } from "@schlopai/tish-dark-matter/engines.tish"
```

## Usage

```javascript
import matter from "@schlopai/tish-dark-matter";

const { data, content } = matter(`---
title: Hello
---
World!`);

console.log(data.title); // "Hello"
console.log(content);    // "World!"
```

## Adding custom engines

You can pass a custom engine parsing function via the `engines` option:

```javascript
import matter from "@schlopai/tish-dark-matter";
import cbor from "cbor";

const result = matter(`---cbor
<cbor hex>
---
Body`, {
  engines: {
    cbor: (str) => cbor.decode(Buffer.from(str, "hex"))
  }
});
```
