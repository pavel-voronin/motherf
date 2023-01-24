#!/usr/bin/env node

import fs from "fs";
import { program } from "commander";
import { Memory, printer as memoryPrinter } from "./memory.js";
import { Tape } from "./tape.js";
import { Interpreter } from "./interpreter.js";

const VERSION = "0.1.0";

program
  .description("Motherf programming language inspired by Brainfuck")
  .version(VERSION)
  .argument("<input>", "input file")
  .option("-i, --input <data>", "string of 1-byte ASCII chars")
  .option("-p, --pipe", "await input from stdin")
  .option("-d, --debug", "debug mode")
  .action(async (file, { input, pipe, debug }) => {
    if (input && pipe) {
      console.error(`Either -i, either -p`);
      process.exit(1);
    }

    if (pipe) {
      try {
        input = await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            console.error(`Provide stdin via -p or use -i instead`);
            process.exit(1);
          }, 100);

          let data = "";

          process.stdin.on("data", function (chunk) {
            clearTimeout(timeout);
            data += chunk;
          });

          process.stdin.on("end", function () {
            clearTimeout(timeout);
            resolve(data);
          });

          process.stdin.on("error", (err) => {
            clearTimeout(timeout);
            reject(err);
          });
        });
      } catch (error) {
        console.error(`Reading stream error: ${error.message}`);
        process.exit(1);
      }
    }

    const code = fs.readFileSync(file).toString();
    const memory = new Memory();
    const tape = new Tape(code, memory);
    const interpreter = new Interpreter(memory, tape, input);

    try {
      interpreter.execute();
    } catch (error) {
      console.log();
      console.error(`Interpreter error:`, error.message);
      process.exit(1);
    }

    console.log();

    if (debug) {
      memoryPrinter(memory, 10);
    }
  })
  .parse();
