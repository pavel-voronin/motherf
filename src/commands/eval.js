export const evalCommand = (interpreter) => {
  const code = interpreter.memory.current();
  const command = String.fromCharCode(code);

  if (command === "$") {
    throw new Error(`Avoid recursion`);
  }

  interpreter.tape.replaceCurrent(command)
  interpreter.runCommand(command);
};
