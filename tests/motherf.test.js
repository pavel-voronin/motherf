import { expect, test, describe } from "vitest";

import { load } from "./utils.js";

describe("Brainfuck", () => {
  test("Hello, World!", () => {
    const interpreter = load("brainfuck/hello-world.b");

    interpreter.execute();

    expect(interpreter.outputBuffer).toBe("Hello, World!");
  });
});

describe("Motherf", () => {
  describe("Evolution of Hello, World!", () => {
    test("Classic one", () => {
      const interpreter = load(
        "motherf/hello-world-evolution/hello-world.motherf"
      );

      interpreter.execute();

      expect(interpreter.outputBuffer).toBe("Hello, World!");
    });

    test("Add comments (;-command)", () => {
      const interpreter = load(
        "motherf/hello-world-evolution/hello-world-comments.motherf"
      );

      interpreter.execute();

      expect(interpreter.outputBuffer).toBe("Hello, World!");
    });

    test("Add Alpha- and alpha-output (A- and a-commands)", () => {
      const interpreter = load(
        "motherf/hello-world-evolution/hello-world-alpha.motherf"
      );

      interpreter.execute();

      expect(interpreter.outputBuffer).toBe("Hello, World!");
    });

    test('Add macros (first double presence pattern, e.g. "1+1", "31113")', () => {
      const interpreter = load(
        "motherf/hello-world-evolution/hello-world-macros.motherf"
      );

      interpreter.execute();

      expect(interpreter.outputBuffer).toBe("Hello, World!");
    });

    test("Add reverse order to calculations (\\-, /- and |-commands)", () => {
      const interpreter = load(
        "motherf/hello-world-evolution/hello-world-directions.motherf"
      );

      interpreter.execute();

      expect(interpreter.outputBuffer).toBe("Hello, World!");
    });
  });

  test(`Jumps`, () => {
    const inputs = {
      abcde3: "c",
      "12qwe4": "w",
      "!@#$%1": "!",
    };

    for (const [input, output] of Object.entries(inputs)) {
      const interpreter = load("motherf/jumps.motherf", input);

      interpreter.execute();

      expect(interpreter.outputBuffer).toBe(output);
    }
  });

  test(`Macro for Alpha-output re-implementation (w/o A-command)`, () => {
    const interpreter = load("motherf/a-output-macro.motherf");

    interpreter.execute();

    expect(interpreter.outputBuffer).toBe("ACC");
  });

  test(`Booleans and other reduces "types" via limit-command`, () => {
    const interpreter = load("motherf/boolean.motherf");

    interpreter.execute();

    expect(interpreter.outputBuffer).toBe("100");
  });

  test(`Inline input ("- and '-commands)`, () => {
    const interpreter = load("motherf/inline-input.motherf");

    interpreter.execute();

    expect(interpreter.outputBuffer).toBe("Hello, World!31337");
  });
});
