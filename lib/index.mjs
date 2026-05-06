import {
  parseYamlFrontmatter,
  parseTomlFrontmatter,
  stringifyYamlFrontmatter,
  stringifyTomlFrontmatter,
} from "../dist/engines_native.js";
import { matterEngine, stringify as stringifyCore } from "../dist/DarkMatter.js";

const defaultEngines = {
  yaml: (str) => parseYamlFrontmatter(str),
  toml: (str) => parseTomlFrontmatter(str),
  json: (str) => JSON.parse(str),
  mdx: (str) => parseYamlFrontmatter(str),
};

defaultEngines.stringify = {
  yaml: (obj) => stringifyYamlFrontmatter(obj),
  toml: (obj) => stringifyTomlFrontmatter(obj),
  json: (obj) => JSON.stringify(obj, null, 2),
  mdx: (obj) => stringifyYamlFrontmatter(obj),
};

export function matter(input, options = {}) {
  return matterEngine(input, options, defaultEngines);
}

export function stringify(obj, options = {}) {
  return stringifyCore(obj, options, defaultEngines);
}

export default matter;
