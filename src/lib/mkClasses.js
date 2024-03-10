/*!
 * adapted from
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

class Classes {
  constructor() {
    this.classes = this.parse_args(arguments);
  }

  push() {
    const newClasses = this.parse_args(arguments);
    this.classes = { ...this.classes, ...newClasses };
    return this;
  }

  extend() {
    const newClasses = this.parse_args(arguments);
    return new Classes({ ...this.classes, ...newClasses });
  }

  toString = () => {
    if (this.cache) {
      return this.classNames;
    }
    const classNames = [];
    for (const key in this.classes) {
      if (this.classes[key]) classNames.push(key);
    }
    this.classNames = classNames.join(' ');
    this.cache = true;
    return this.classNames;
  };

  parse_args = (args) => {
    let classes = {};
    for (const arg of args) {
      if (!arg) continue;

      const argType = typeof arg;

      if (argType === 'string' || argType === 'number') {
        classes[arg] = true;
      } else if (Array.isArray(arg)) {
        const inner = this.parse_args(arg);
        classes = { ...classes, ...inner };
      } else if (argType === 'object') {
        classes = { ...classes, ...arg };
      }
      this.cache = false;
    }
    return classes;
  };
}

function mkClasses(...args) {
  const instance = new Classes(...args);
  return instance.toString();
}

export { Classes };
export default mkClasses;
