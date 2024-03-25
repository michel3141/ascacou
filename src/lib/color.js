/**
 *     ascacou - A 1 vs 1 strategy game ( created by Marc Buonomo )
 *     Copyright (C) 2024  michel3141
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)
// Version 4.1
/* eslint-disable no-bitwise */
const pSBC = (p, c0, c1, l) => {
  let r;
  let g;
  let b;
  let P;
  let f;
  let t;
  let h;
  const m = Math.round;
  let a = typeof c1 === 'string';
  if (
    typeof p !== 'number' ||
    p < -1 ||
    p > 1 ||
    typeof c0 !== 'string' ||
    (c0[0] !== 'r' && c0[0] !== '#') ||
    (c1 && !a)
  ) {
    return null;
  }
  h = c0.length > 9;
  h = a ? (c1.length > 9 ? true : c1 === 'c' ? !h : false) : h;
  f = pSBC.pSBCr(c0);
  P = p < 0;
  t =
    c1 && c1 !== 'c'
      ? pSBC.pSBCr(c1)
      : P
        ? { r: 0, g: 0, b: 0, a: -1 }
        : { r: 255, g: 255, b: 255, a: -1 };
  p = P ? p * -1 : p;
  P = 1 - p;
  if (!f || !t) return null;
  if (l) {
    r = m(P * f.r + p * t.r);
    g = m(P * f.g + p * t.g);
    b = m(P * f.b + p * t.b);
  } else {
    r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5);
    g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5);
    b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
  }
  a = f.a;
  t = t.a;
  f = a >= 0 || t >= 0;
  a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0;
  return pSBC.pSBCw({ r, g, b, a }, { transparency: f, rgb: h });
};

pSBC.pSBCr = (d) => {
  const i = parseInt;
  let n = d.length;
  const x = {};
  if (n > 9) {
    const [r, g, b, a] = (d = d.split(','));
    n = d.length;
    if (n < 3 || n > 4) return null;
    x.r = i(r[3] === 'a' ? r.slice(5) : r.slice(4));
    x.g = i(g);
    x.b = i(b);
    x.a = a ? parseFloat(a) : -1;
  } else {
    if (n === 8 || n === 6 || n < 4) return null;
    if (n < 6)
      d =
        '#' +
        d[1] +
        d[1] +
        d[2] +
        d[2] +
        d[3] +
        d[3] +
        (n > 4 ? d[4] + d[4] : '');
    d = i(d.slice(1), 16);
    if (n === 9 || n === 5) {
      x.r = (d >> 24) & 255;
      x.g = (d >> 16) & 255;
      x.b = (d >> 8) & 255;
      x.a = Math.round((d & 255) / 0.255) / 1000;
    } else {
      x.r = d >> 16;
      x.g = (d >> 8) & 255;
      x.b = d & 255;
      x.a = -1;
    }
  }
  return x;
};

pSBC.pSBCw = (x, { rgb = false, transparency = false } = {}) => {
  const m = Math.round;
  const { r, g, b, a } = x;
  const f = transparency;
  if (rgb) {
    return (
      'rgb' +
      (f ? 'a(' : '(') +
      r +
      ',' +
      g +
      ',' +
      b +
      (f ? ',' + m(a * 1000) / 1000 : '') +
      ')'
    );
  } else {
    return (
      '#' +
      (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0))
        .toString(16)
        .slice(1, f ? undefined : -2)
    );
  }
};
/* eslint-enable no-bitwise */

class Color {
  constructor(color) {
    this.color = color;
  }

  lighten(percent) {
    return pSBC(0.0 + percent, this.color);
  }

  darken(percent) {
    return pSBC(0.0 - percent, this.color);
  }

  opacity(percent) {
    const x = pSBC.pSBCr(this.color);
    x.a = percent;
    return pSBC.pSBCw(x, { transparency: true });
  }

  toString() {
    return pSBC.pSBCw(pSBC.pSBCr(this.color));
  }
}

const lighten = (color, percent) => new Color(color).lighten(percent);
const darken = (color, percent) => new Color(color).darken(percent);
const opacity = (color, percent) => new Color(color).opacity(percent);

export { lighten, darken, opacity };
export default Color;
