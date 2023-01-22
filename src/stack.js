export class Stack {
  constructor(memory) {
    this.memory = memory;

    this.stack = [];
  }

  #add(cell) {
    this.stack = [...new Set(this.stack.concat(cell).sort((a, b) => a - b))];
  }

  #remove(cell) {
    this.stack = this.stack.filter((v) => v !== cell);
  }

  toggle(cell) {
    if (this.stack.includes(cell)) {
      this.#remove(cell);
    } else {
      this.#add(cell);
    }
  }

  unshift() {
    if (this.stack.length === 0) return;

    for (let i = this.stack.length - 1; i > 0; i--) {
      this.memory.memory[this.stack[i]] = this.memory.memory[this.stack[i - 1]];
    }

    this.memory.memory[this.stack[0]] = this.memory.current();
  }

  shift() {
    if (this.stack.length === 0) return;

    this.memory.set(this.memory.memory[this.stack[0]]);

    for (let i = 0; i < this.stack.length - 1; i++) {
      this.memory.memory[this.stack[i]] = this.memory.memory[this.stack[i + 1]];
    }

    this.memory.memory[this.stack.at(-1)] = 0; // ?
  }
}
