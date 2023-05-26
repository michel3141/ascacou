import { log } from '/lib/isDevMode';
const { localStorage } = window;

export function setItem (name, value) {
  logger('set', name, value);
  localStorage.setItem(name, JSON.stringify(value));
}

export function removeItem (name) {
  logger('remove', name);
  localStorage.removeItem(name);
}

export function getItem (name) {
  const json = localStorage.getItem(name);
  const value = json === null ? null : JSON.parse(json);
  logger('get', name, value);
  return value;
}

export function initStorage () {}
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
