import toKebabCase from "./to-kebab-case";

test("toKebabCase", () => {
  expect(toKebabCase()).toBe("");
  expect(toKebabCase("lorEm")).toBe("lorem");
  expect(toKebabCase("lorem ipsum")).toBe("lorem-ipsum");
  expect(toKebabCase("lorem_ipsum")).toBe("lorem-ipsum");
  expect(toKebabCase("lorem #ipsum")).toBe("lorem-ipsum");
  expect(toKebabCase("Lorem Ipsum Dolor")).toBe("lorem-ipsum-dolor");
});
