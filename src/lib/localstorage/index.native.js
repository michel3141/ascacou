import SyncStorage from 'sync-storage';
import Emitter from 'src/tools/eventEmitter';

export function setItem (name, value) {
  SyncStorage.set(name, JSON.stringify(value));
}

export function removeItem (name) {
  SyncStorage.remove(name);
}

export function getItem (name) {
  const value = SyncStorage.get(name);
  return value === null ? null : JSON.parse(value);
}

export async function initStorage () {
  const data = await SyncStorage.init();
  console.log('AsyncStorage is ready!', data);
  Emitter.emit('storageReady');
}
