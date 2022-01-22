export default class Square {
  constructor(coord = '', next = null, new_row = 1) {
    this.new_row = new_row
    this.next = next // accès en lecture
    this._content = 0
    this.coord = coord // accès en lecture
    this.inters = []
  }

  // short-cut
  nl() {
    return this.new_row
  }
  set content(content) {
    this._content = content
  }
  get content() {
    return this._content
  }

  play(content) {
    const save = this.content
    this.content = content
    if (this.update()) {
      return true
    } else {
      this.content = save
      this.update()
      return false
    }
  }

  pattern() {
    let pattern
    if (this.content != '0') {
      pattern = this.content
    } else {
      pattern = this.playable().join('')
      if (pattern == '') {
        pattern = 'X'
      } else {
        pattern = '[' + pattern + ']'
      }
    }
    return pattern
  }

  playable() {
    const list = []
    if (this.content == 0) {
      if (this.play(1)) {
        list.push(1)
        this.play(0)
      }
      if (this.play(2)) {
        list.push(2)
        this.play(0)
      }
    }
    return list
  }

  add_inter(inter) {
    this.inters.push(inter)
  }

  update() {
    for (const inter of this.inters) {
      if (!inter.update()) {
        return false
      }
    }
    return true
  }
}
