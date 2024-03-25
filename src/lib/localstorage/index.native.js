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

import SyncStorage from 'sync-storage';
import Emitter from 'src/tools/eventEmitter';

export function setItem(name, value) {
  SyncStorage.set(name, JSON.stringify(value));
}

export function removeItem(name) {
  SyncStorage.remove(name);
}

export function getItem(name) {
  const value = SyncStorage.get(name);
  return value === null ? null : JSON.parse(value);
}

export async function initStorage() {
  const data = await SyncStorage.init();
  console.log('AsyncStorage is ready!', data);
  Emitter.emit('storageReady');
}
