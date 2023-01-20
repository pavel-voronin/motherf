export const loopEnd = ({ memory, tape }) => {
  if (memory.current() !== 0) {
    const position = tape.findLeft("[");

    if (position === null) {
      throw new Error(`Where is '['?`);
    }

    tape.back(tape.position - position);
  }
};

export const loopStart = ({ memory, tape }) => {
  if (memory.current() === 0) {
    const position = tape.findRight("]");

    if (position === null) {
      throw new Error(`Where is ']'?`);
    }

    tape.forward(position - tape.position);
  }
};
