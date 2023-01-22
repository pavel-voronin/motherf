import { Interpreter } from "../interpreter.js";
import { Tape } from "../tape.js";

export const toggleStackness = ({ stack, memory }) => {
  stack.toggle(memory.pointer);
};

export const unshift = ({ stack }) => {
  stack.unshift();
};

export const shift = ({ stack }) => {
  stack.shift();
};

export const func = ({ tape, memory, stack }) => {
  const position = tape.findRight(")");

  if (position === null) {
    throw new Error(`Where is ")"?`);
  }

  const code = tape.tape.slice(tape.position + 1, position);
  const forkMemory = memory.fork(stack.stack);
  const forkTape = new Tape(code, forkMemory);
  const forkInterpreter = new Interpreter(forkMemory, forkTape, "", {
    stackMode: true,
  }); // data?

  forkInterpreter.execute();

  memory.merge(stack.stack, forkInterpreter.memory);

  tape.position = position;
};
