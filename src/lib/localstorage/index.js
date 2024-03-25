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

import { log } from '~/lib/isDevMode';
const { localStorage } = window;

export function setItem(name, value) {
  logger('set', name, value);
  localStorage.setItem(name, JSON.stringify(value));
}

export function removeItem(name) {
  logger('remove', name);
  localStorage.removeItem(name);
}

export function getItem(name) {
  const json = localStorage.getItem(name);
  const value = json === null ? null : JSON.parse(json);
  logger('get', name, value);
  return value;
}

export function initStorage() {}
// Middleware

const logger = (type, name, payload) => {
  const lines = ['___________', `localStore-${type}: ${name}`];
  if (payload !== undefined) {
    const json = JSON.stringify(payload, null, 2).split(/\n/);
    lines.push(...json);
  }
  lines.push('__');

  log(lines.map((x, i) => (i ? '||' : '..') + x).join('\n'));
};
