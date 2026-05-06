import {
  parseYamlFrontmatter,
  parseTomlFrontmatter,
  stringifyYamlFrontmatter,
  stringifyTomlFrontmatter,
} from "../dist/engines.js";
import { matterEngine, stringify as stringifyCore } from "../dist/main.js";

const defaultEngines = {
  yaml: parseYamlFrontmatter,
  toml: parseTomlFrontmatter,
  json: JSON.parse,
  mdx: parseYamlFrontmatter,
};

defaultEngines.stringify = {
  yaml: stringifyYamlFrontmatter,
  toml: stringifyTomlFrontmatter,
  json: (obj) => JSON.stringify(obj, null, 2),
  mdx: stringifyYamlFrontmatter,
};

export function matter(input, options = {}) {
  return matterEngine(input, options, defaultEngines);
}

export function stringify(obj, options = {}) {
  return stringifyCore(obj, options, defaultEngines);
}

export default matter;
