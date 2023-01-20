export const comment = ({ tape }) => {
  const position = tape.findRight("\n") ?? tape.length - 1;
  tape.forward(position - tape.position);
};
