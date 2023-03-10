# Motherf

> **DEVELOPMENT IN PROCESS! DO NOT USE THIS IN PRODUCTION**

Motherf is a programming language inspired by Brainfuck. It compiles any BF program and extends its syntax with a variety of 1 character commands.

Have fun!

## Usage

```
npx @pvoronin/motherf -h
echo "#0#0#0" > code.motherf
npx @pvoronin/motherf code.motherf -i 123
```

Learning by code (`tests` folder) is highly recommended.

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
- `%`: Toggles current cell to be a part of stack
- `^`: Push (copy) cell value to stack (tail of stack lost)
- `v`: Pop from stack (tail of stack gets 0)
- `()`: Launch code inside brackets over isolated stack - linked list of cells
- `$`: Eval
- `` ` ``: Direct output from code
- `{`: Open numbered portal
- `}`: Link portal to new cell (or collapse)
- `_`: Jump to numbered portal
- Skip every empty symbol: space, new line, tab

## Examples

The code is covered by tests with extensive comments. Each command has a usage example and description.

## Roadmap

The language design is now in beta. Everything may change. I'm considering doing the following:

- Testing <- *You can help me here*
- Refactoring
- Architecture
- Rewrite into Rust
- Compile to WASM

Please, try this language for 15 minutes and give me your feedback :raised_hands:

## Contributing

I welcome contributions to the Motherf project!

If you are interested in contributing, you are welcome in discussions, issues, personal messages, wherever.

Any help will be appreciated.