export const DEFAULT_MEMORY_SIZE = 30000;

export const printer = (memory, columns = 10) => {
  console.log(`Memory of size`, memory.size);
  console.log();

  let emptyStringsCount = 0;

  for (let i = 0; i < Math.ceil(memory.size / columns); i++) {
    const emptyString = memory.memory
      .slice(columns * i, columns * (i + 1))
      .every((v) => v === 0);

    if (emptyString) {
      emptyStringsCount++;
    }

    if (!emptyString || i === Math.ceil(memory.size / columns) - 1) {
      if (emptyStringsCount) {
        console.log(`... ${emptyStringsCount} empty strings ...`);
        emptyStringsCount = 0;
      }

      if (!emptyString)
        console.log(...memory.memory.slice(columns * i, columns * (i + 1)));
    }
  }
};

export class Memory {
  constructor(size = DEFAULT_MEMORY_SIZE) {
    this.size = size;
    this.memory = new Uint8Array(size);
    this.directions = new Array(size).fill(true);
    this.limits = new Uint8Array(size).fill(255);
    this.pointer = 0;
  }

  inc() {
    const limit = this.limits[this.pointer] + 1;

    if (this.directions[this.pointer]) {
      this.memory[this.pointer] =
        (this.memory[this.pointer] + limit + 1) % limit;
    } else {
      this.memory[this.pointer] =
        (this.memory[this.pointer] + limit - 1) % limit;
    }
  }

  dec() {
    const limit = this.limits[this.pointer] + 1;

    if (this.directions[this.pointer]) {
      this.memory[this.pointer] =
        (this.memory[this.pointer] + limit - 1) % limit;
    } else {
      this.memory[this.pointer] =
        (this.memory[this.pointer] + limit + 1) % limit;
    }
  }

  direct() {
    this.directions[this.pointer] = true;
  }

  reverse() {
    this.directions[this.pointer] = false;
  }

  toggle() {
    this.directions[this.pointer] = !this.directions[this.pointer];
  }

  set(val) {
    this.memory[this.pointer] = val;
  }

  right(steps = 1) {
    this.pointer = (this.size + this.pointer + steps) % this.size;
  }

  left(steps = 1) {
    this.pointer = (this.size + this.pointer - steps) % this.size;
  }

  jump() {
    if (this.directions[this.pointer]) {
      this.right(this.current());
    } else {
      this.left(this.current());
    }
  }

  lock() {
    this.limits[this.pointer] = this.memory[this.pointer];
  }

  release() {
    this.limits[this.pointer] = 255;
  }

  current() {
    return this.memory[this.pointer];
  }
}
