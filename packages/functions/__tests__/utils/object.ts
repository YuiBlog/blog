/// <reference path="../../node_modules/@types/jest/index.d.ts" />

import * as object from "../../src/utils/object";

type TestObject = { a: number, b: number };

describe("utilities for objects", () => {
  describe("#without", () => {
    let r!: TestObject;

    beforeAll(() => {
      r = object.without({ a: 1, b: 2 } as TestObject, "a");
    });

    it("a is undefined (removed)", () => {
      expect(r.a).toBe(undefined);
    });

    it("b is 2", () => {
      expect(r.b).toBe(2);
    });
  });
});