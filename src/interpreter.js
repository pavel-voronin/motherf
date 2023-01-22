import {
  skip,
  macro,
  log,
  numberLog,
  input,
  alphaLog,
  AlphaLog,
  numberInput,
  inlineRawInput,
  inlineNumberInput,
  inc,
  dec,
  left,
  right,
  direct,
  reverse,
  toggle,
  lock,
  release,
  jump,
  comment,
  loopStart,
  loopEnd,
  overflowToggle,
  toggleStackness,
  unshift,
  shift,
  func,
} from "./commands/index.js";
import { Stack } from "./stack.js";

const RESERVED = [
  "_", // make portals
  "`", // log everything inside to the output
  "$", // use cell as command and run it
  "?", // output to stack or next cell bitmask of modes of current cell

  "!",
  "{}",
  "*",
  ":",
]
  .join("")
  .match(/./g);

const FALLBACK = Symbol();

export class Interpreter {
  constructor(memory, tape, data, options) {
    this.memory = memory;
    this.tape = tape;
    this.data = (data ?? "").split("");
    this.options = options;

    this.outputBuffer = "";
    this.output = (v) => {
      this.outputBuffer += v;

      if (!this.options?.silent) {
        process.stdout.write(v);
      }
    };

    this.macros = {};
    this.callstack = [];
    this.stack = new Stack(memory);
    this.commands = {};

    this.addCommand(",", input);
    this.addCommand("#", numberInput);
    this.addCommand("a", alphaLog);
    this.addCommand("A", AlphaLog);
    this.addCommand(".", log);
    this.addCommand(" ", skip);
    this.addCommand("\n", skip);
    this.addCommand("\t", skip);
    this.addCommand("+", inc);
    this.addCommand("-", dec);
    this.addCommand("<", left);
    this.addCommand(">", right);
    this.addCommand(";", comment);
    this.addCommand("[", loopStart);
    this.addCommand("]", loopEnd);
    this.addCommand(`\\`, reverse);
    this.addCommand(`/`, direct);
    this.addCommand(`|`, toggle);
    this.addCommand(`@`, jump);
    this.addCommand(`=`, lock);
    this.addCommand(`~`, release);
    this.addCommand(`0`, numberLog);
    this.addCommand(`"`, inlineRawInput);
    this.addCommand(`'`, inlineNumberInput);
    this.addCommand(`&`, overflowToggle);

    if (!this.options?.stackMode) {
      this.addCommand(`%`, toggleStackness);
      this.addCommand(`^`, unshift);
      this.addCommand(`v`, shift);
      this.addCommand(`(`, func);
      this.addCommand(`)`, skip);
    }

    this.addFallbackCommand(macro);
  }

  addFallbackCommand(command) {
    this.addCommand(FALLBACK, command);
  }

  addCommand(symbol, command) {
    if (RESERVED.includes(symbol)) {
      throw new Error(`This command is reserved: ${symbol}`);
    }

    if (symbol in this.commands) {
      throw new Error(`This command was already registered: ${symbol}`);
    }

    this.commands[symbol] = command;
  }

  execute() {
    while (true) {
      let command = this.tape.forward();

      if (command === null) {
        return;
      }

      if (RESERVED.includes(command)) {
        throw new Error(`Command ${command} is reserved`);
      }

      if (!(command in this.commands)) {
        if (FALLBACK in this.commands) {
          command = FALLBACK;
        } else {
          throw new Error(`Unknown command: ${command}`);
        }
      }

      this.commands[command](this);
    }
  }
}
