/*!
 * adapted from
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

class Classes {
  constructor() {
    this.classes = this.parse_args(arguments)
  }

  push() {
    const new_classes = this.parse_args(arguments)
    this.classes = { ...this.classes, ...new_classes }
    return this
  }

  extend() {
    const new_classes = this.parse_args(arguments)
    return new Classes({ ...this.classes, ...new_classes })
  }

  toString = () => {
    if (this.cache) {
      return this.class_names
    }
    const class_names = []
    for (const key in this.classes) {
      if (this.classes[key]) class_names.push(key)
    }
    this.class_names = class_names.join(' ')
    this.cache = true
    return this.class_names
  }

  parse_args = args => {
    let classes = {}
    for (const arg of args) {
      if (!arg) continue

      const argType = typeof arg

      if (argType === 'string' || argType === 'number') {
        classes[arg] = true
      } else if (Array.isArray(arg)) {
        const inner = this.parse_args(arg)
        classes = { ...classes, ...inner }
      } else if (argType === 'object') {
        classes = { ...classes, ...arg }
      }
      this.cache = false
    }
    return classes
  }
}

function mkClasses(...args) {
  const instance = new Classes(...args)
  return instance.toString()
}

export { Classes }
export default mkClasses
