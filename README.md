# Motherf

Motherf is a programming language inspired by Brainfuck. It compiles any BF program and extends its syntax with a variety of 1 character commands.

> Have fun!

## Usage

```
git clone ...
cd motherf
npm run dev -- tests/scripts/motherf/jumps.motherf --data 12qwe4
```

or just 

```
...
npm run test
```

Learning by code is highly recommended.

## Commands

- `,`: Enter 1 character
- `#`: Enter 1 number (like `,` but - 48)
- `"`: Inline string input
- `'`: Inline digits input
- `.`: Output current memory cell (ASCII)
- `a`: Output one lowercase character (like `.` but -97)
- `A`: Output an uppercase character (like `.` but -65)
- `0`: Output the current memory cell as a number (like `.` but -48)
- `+`: Increment current memory cell
- `-`: Decrement the current cell
- `<`: Move memory pointer to the left
- `>`: Move memory pointer to the right
- `;`: Comment from here to the end of the string
- `[`: Start a loop
- `]`: End a loop
- `\`: Reverse direction of current cell (`+` means `-` and vice versa)
- `/`: Direct direction of the memory pointer (by default)
- `|`: Toggle the direction of the memory pointer
- `@`: Jump some steps right or left using memory cell value as offset
- `=`: Lock current memory cell maximum value
- `~`: Unlock current memory cell maximum value
- `&`: Link cell with next one to overflow into
- Skip every empty symbol: space, new line, tab

## Examples

Tests are covered with comments. Each command has a usage example and description.

## Roadmap

The language design is still under development. I'm considering doing the following:

- Initialize memory in code by simulating the input:
  ```
  :input this string into memory and move pointer:
  ```
- Stack, registers
- Stack-based functions
- Glue memory tape parts (or portals)

## Contributing

We welcome contributions to the Motherf project. If you are interested in contributing, you are welcome in discussions, issues, personal messages, wherever.