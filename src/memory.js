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
    this.overflow = new Array(size).fill(false);
    this.limits = new Uint8Array(size).fill(255);
    this.pointer = 0;
    this.portals = {};
  }

  fork(cells) {
    const branch = new Memory(cells.length);

    for (const i in cells) {
      const cell = cells[i];

      branch.memory[i] = this.memory[cell];
      branch.directions[i] = this.directions[cell];
      branch.overflow[i] = this.overflow[cell];
      branch.limits[i] = this.limits[cell];
    }

    return branch;
  }

  merge(cells, branch) {
    for (const i in cells) {
      const cell = cells[i];

      this.memory[cell] = branch.memory[i];
      this.directions[cell] = branch.directions[i];
      this.overflow[cell] = branch.overflow[i];
      this.limits[cell] = branch.limits[i];
    }
  }

  inc() {
    const limit = this.limits[this.pointer] + 1;
    const diff = this.directions[this.pointer] ? 1 : -1;
    const newVal = this.memory[this.pointer] + limit + diff;
    const overflowUp = this.memory[this.pointer] + diff >= limit;
    const overflowDown = this.memory[this.pointer] + diff < 0;

    this.memory[this.pointer] = newVal % limit;

    if (this.overflow[this.pointer]) {
      if (overflowUp) {
        this.right();
        this.inc();
        this.left();
      } else if (overflowDown) {
        this.right();
        this.dec();
        this.left();
      }
    }
  }

  dec() {
    const limit = this.limits[this.pointer] + 1;
    const diff = this.directions[this.pointer] ? -1 : 1;
    const newVal = this.memory[this.pointer] + limit + diff;
    const overflowUp = this.memory[this.pointer] + diff >= limit;
    const overflowDown = this.memory[this.pointer] + diff < 0;

    this.memory[this.pointer] = newVal % limit;

    if (this.overflow[this.pointer]) {
      if (overflowUp) {
        this.right();
        this.inc();
        this.left();
      } else if (overflowDown) {
        this.right();
        this.dec();
        this.left();
      }
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
    if (steps === 1) {
      // sort before?
      const portal = Object.entries(this.portals).find(
        ([_, { entrance }]) => entrance === this.pointer
      );

      if (portal && portal[1].exit !== null) {
        this.pointer = portal[1].exit;
        return;
      }
    }

    this.offset(steps);
  }

  left(steps = 1) {
    if (steps === 1) {
      // sort before?
      const portal = Object.entries(this.portals).find(
        ([_, { exit }]) => exit === this.pointer
      );

      if (portal) {
        this.pointer = portal[1].entrance;
        return;
      }
    }

    this.offset(-steps);
  }

  offset(steps) {
    this.pointer = (this.size + this.pointer + steps) % this.size;
  }

  jump() {
    if (this.directions[this.pointer]) {
      this.offset(this.current());
    } else {
      this.offset(-this.current());
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

  toggleOverflow() {
    this.overflow[this.pointer] = !this.overflow[this.pointer];
  }

  openPortal() {
    this.portals[this.current()] = { entrance: this.pointer, exit: null };
  }

  linkPortal() {
    if (!(this.current() in this.portals)) {
      throw new Error(`Where is entrance of portal ${this.current()}?`);
    }

    const portal = this.portals[this.current()];

    if (portal.entrance === this.pointer) {
      delete this.portals[this.current()];
    }

    portal.exit = this.pointer;
  }

  portalJump() {
    if (!(this.current() in this.portals)) {
      return;
    }

    const portal = this.portals[this.current()];

    this.pointer = portal.entrance;
  }
}
