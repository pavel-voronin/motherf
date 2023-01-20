export class Tape {
  constructor(tape, memory) {
    this.tape = tape;
    this.length = this.tape.length;
    this.position = null;
    this.memory = memory;
  }

  glue(tape) {
    this.tape += tape;
    this.length = this.tape.length;
  }

  forward(steps = 1) {
    if (this.position === null) {
      if (this.tape.length < steps) {
        return null;
      }

      this.position = steps - 1;

      return this.tape[this.position];
    } else {
      if (this.position + steps >= this.length) {
        return null;
      }

      this.position += steps;

      return this.tape[this.position];
    }
  }

  current() {
    return this.tape[this.position];
  }

  back(steps = 1) {
    if (this.position === null) {
      return null;
    }

    this.position -= steps;

    if (this.position < 0) {
      return null;
    }

    return this.tape[this.position];
  }

  findLeft(char) {
    for (let i = this.position - 1; i >= 0; i--) {
      if (this.tape[i] === char) {
        return i;
      }
    }

    return null;
  }

  findRight(char) {
    for (let i = this.position + 1; i < this.length; i++) {
      if (this.tape[i] === char) {
        return i;
      }
    }

    return null;
  }
}
