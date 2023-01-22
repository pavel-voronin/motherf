const newMacro = ({ tape, macros }) => {
  const macroName = tape.current();

  const position = tape.findRight(macroName);

  if (position === null) {
    throw new Error(`Macros should end with it's name: ${macroName}`);
  }

  macros[macroName] = tape.position;
  tape.forward(position - tape.position);
};

export const macro = ({ tape, macros, stack }) => {
  const macroName = tape.current();

  if (macroName in macros) {
    let head;

    if (stack.length === 0 || stack.at(-1)[0] != macroName) {
      // this is entrance to the macros
      stack.push([macroName, tape.position]);
      tape.position = macros[macroName];
    } else {
      // this is exit from macros
      const [, position] = stack.pop();
      tape.position = position;
    }
  } else {
    newMacro({ tape, macros });
  }
};
