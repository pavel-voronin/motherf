export const dec = ({ memory }) => {
  memory.dec();
};

export const inc = ({ memory }) => {
  memory.inc();
};

export const left = ({ memory }) => {
  memory.left();
};

export const right = ({ memory }) => {
  memory.right();
};

export const direct = ({ memory }) => {
  memory.direct();
};

export const reverse = ({ memory }) => {
  memory.reverse();
};

export const toggle = ({ memory }) => {
  memory.toggle();
};

export const jump = ({ memory }) => {
  memory.jump();
};


export const lock = ({ memory }) => {
  memory.lock();
};


export const release = ({ memory }) => {
  memory.release();
};
