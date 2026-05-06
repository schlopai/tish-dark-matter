import assert from "node:assert";
import matter, { stringify } from "../lib/index.mjs";

console.log("Running tests...");

// Test 1: Basic YAML
{
  const input = `---\ntitle: Hello\n---\nWorld`;
  const result = matter(input);
  assert.deepEqual(result.data, { title: "Hello" });
  assert.equal(result.content, "World");
  assert.equal(result.language, "yaml");
}

// Test 2: Custom Delimiters
{
  const input = `+++\ntitle = "TOML"\n+++\nWorld`;
  const result = matter(input);
  assert.deepEqual(result.data, { title: "TOML" });
  assert.equal(result.content, "World");
  assert.equal(result.language, "toml");
}

// Test 3: JSON Frontmatter
{
  const input = `{\n  "title": "JSON"\n}\nWorld`;
  const result = matter(input);
  assert.deepEqual(result.data, { title: "JSON" });
  assert.equal(result.content, "World");
  assert.equal(result.language, "json");
}

// Test 4: Custom Engine Override
{
  const input = `---cbor\n<cbor>\n---\nWorld`;
  const result = matter(input, {
    engines: {
      cbor: (str) => ({ custom: str.trim() })
    }
  });
  assert.deepEqual(result.data, { custom: "<cbor>" });
  assert.equal(result.content, "World");
  assert.equal(result.language, "cbor");
}

// Test 5: MDX treated as YAML
{
  const input = `---mdx\ntitle: MDX\n---\n# World`;
  const result = matter(input);
  assert.deepEqual(result.data, { title: "MDX" });
  assert.equal(result.content, "# World");
}

// Test 6: Stringify
{
  const obj = { data: { title: "Test" }, content: "Body" };
  const out = stringify(obj);
  assert.equal(out.trim(), `---\ntitle: Test\n---\nBody`.trim());
}

// Test 7: Excerpt
{
  const input = `---\ntitle: Excerpt\n---\nIntro\n---\nBody`;
  const result = matter(input, { excerpt: true });
  assert.equal(result.excerpt, "Intro");
}

console.log("All tests passed!");
