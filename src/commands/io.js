export const log = ({ memory, output }) => {
  output(String.fromCharCode(memory.current()));
};

export const numberLog = ({ memory, output }) => {
  output(String.fromCharCode(memory.current() + "0".charCodeAt(0)));
};

export const alphaLog = ({ memory, output }) => {
  output(String.fromCharCode(memory.current() + "a".charCodeAt(0)));
};

export const AlphaLog = ({ memory, output }) => {
  output(String.fromCharCode(memory.current() + "A".charCodeAt(0)));
};

export const input = ({ data, memory }) => {
  if (data.length === 0) {
    throw new Error(`Not enough data`);
  }

  const ord = data.shift().charCodeAt(0);
  memory.set(ord);
};

export const numberInput = ({ data, memory }) => {
  if (data.length === 0) {
    throw new Error(`Not enough data`);
  }

  const ord = data.shift().charCodeAt(0) - "0".charCodeAt(0);
  memory.set(ord);
};

export const inlineInput = ({ tape, memory }) => {
  let from = tape.position + 1;
  const mode = tape.tape[from] === "#" ? "number" : "string";

  if (mode === "number") {
    from++;
  }

  const to = tape.findRight(":");
  const eol = tape.findRight("\n");

  if (to === null) {
    throw new Error(`Where is another ":"?`);
  }

  if (eol && eol < to) {
    throw new Error(`New lines not supported?`);
  }

  for (let i = from; i < to; i++) {
    if (mode === "number") {
      memory.set(tape.tape[i].charCodeAt(0) - "0".charCodeAt(0));
    } else {
      memory.set(tape.tape[i].charCodeAt(0));
    }

    memory.right();
  }

  tape.forward(to - tape.position);
};
