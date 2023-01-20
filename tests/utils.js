import fs from "fs";
import { join } from "path";
import { Memory } from "../src/memory.js";
import { Tape } from "../src/tape.js";
import { Interpreter } from "../src/interpreter.js";

export const load = (name, data = "") => {
  const code = fs.readFileSync(join(__dirname, "scripts", name)).toString();

  const memory = new Memory();
  const tape = new Tape(code, memory);
  const interpreter = new Interpreter(memory, tape, data, { silent: true });

  return interpreter;
};
