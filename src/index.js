import fs from "fs";
import { program } from "commander";
import { Memory, printer as memoryPrinter } from "./memory.js";
import { Tape } from "./tape.js";
import { Interpreter } from "./interpreter.js";

program
  .argument("<input>")
  .option("--data <data>")
  .action((input, { data }) => {
    const code = fs.readFileSync(input).toString();

    const memory = new Memory();
    const tape = new Tape(code, memory);
    const interpreter = new Interpreter(memory, tape, data);

    interpreter.execute();

    console.log();

    memoryPrinter(memory, 10);
  });

program.parse();
