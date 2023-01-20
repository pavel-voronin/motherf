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
