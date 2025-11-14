import { describe, expect, test } from "vitest";
import { getClassName } from "./className.helpers";

describe("getClassName", () => {
  test("returns default class when no custom styles provided", () => {
    const result = getClassName("default-class", "key");
    expect(result).toBe("default-class");
  });

  test("returns default class with custom class when provided", () => {
    const result = getClassName("default-class", "key", undefined, "custom-class");
    expect(result).toBe("default-class custom-class");
  });

  test("returns custom style module class when useDefaultStyles is false", () => {
    const customStyleModule = {
      key: "custom-module-class",
    };
    const result = getClassName(
      "default-class",
      "key",
      customStyleModule,
      undefined,
      false
    );
    expect(result).toBe("custom-module-class");
  });

  test("returns custom class when useDefaultStyles is false and no module class", () => {
    const customStyleModule = {};
    const result = getClassName(
      "default-class",
      "key",
      customStyleModule,
      "custom-class",
      false
    );
    expect(result).toBe("custom-class");
  });

  test("returns empty string when useDefaultStyles is false and no styles provided", () => {
    const result = getClassName("default-class", "key", {}, undefined, false);
    expect(result).toBe("");
  });

  test("combines default class with custom style module class", () => {
    const customStyleModule = {
      key: "custom-module-class",
    };
    const result = getClassName("default-class", "key", customStyleModule);
    expect(result).toBe("default-class custom-module-class");
  });

  test("combines default class, custom style module class, and custom class", () => {
    const customStyleModule = {
      key: "custom-module-class",
    };
    const result = getClassName(
      "default-class",
      "key",
      customStyleModule,
      "custom-class"
    );
    expect(result).toBe("default-class custom-module-class custom-class");
  });

  test("trims whitespace from combined classes", () => {
    const customStyleModule = {
      key: "custom-module-class",
    };
    const result = getClassName(
      "default-class",
      "key",
      customStyleModule,
      "custom-class"
    );
    expect(result).not.toContain("  ");
    expect(result.split(" ").length).toBe(3);
  });

  test("handles custom style module with different key", () => {
    const customStyleModule = {
      otherKey: "other-class",
    };
    const result = getClassName("default-class", "key", customStyleModule);
    expect(result).toBe("default-class");
  });

  test("handles undefined customStyleModule", () => {
    const result = getClassName("default-class", "key", undefined, "custom-class");
    expect(result).toBe("default-class custom-class");
  });
});

