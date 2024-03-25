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

// https://dmitripavlutin.com/environment-variables-javascript/
const MODE =
  typeof window.proccess !== 'undefined' ? window.process.env.NODE_ENV : import.meta.env.MODE;
const isDevMode = MODE !== 'production';

export const log = (...args) => isDevMode && console.log(...args);
export const debug = (...args) => isDevMode && console.debug(...args);
export const warn = (...args) => isDevMode && console.warn(...args);
export default isDevMode;
