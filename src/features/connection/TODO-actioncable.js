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

import { createConsumer as _createConsumer } from '@rails/actioncable';

const log = () => {};
// const { log } = console;

const cache = {};

export const createConsumer = (url) => {
  if (!(url in cache)) {
    cache[url] = _createConsumer(url);
  }
  return cache[url];
};

export const perform = (prepareData = (x) => x) => ({
  perform: (action) =>
    function (data) {
      log('PERFORM', action, data, '=>', prepareData(data));
      this.perform(action, prepareData(data));
    },
});

export const subscribe = (consumer, identifier, actions) =>
  consumer.subscriptions.findAll(JSON.stringify(identifier)).at(0) ||
  consumer.subscriptions.create(
    identifier,
    WebsocketHandler(identifier, actions),
  );

function received(response) {
  log('IN:', this.identifier, ':', Object.keys(response).join(', '));
  Object.entries(response).forEach(([key, data]) => {
    const onMessage = `on_${key}`;
    if (onMessage in this) {
      log(onMessage, data);
      this[onMessage](data);
    }
  });
}

function connected() {
  log('connected', this.identifier);
  this.on_connected && this.on_connected();
}

function disconnected() {
  log('disconnected', this.identifier);
  this.on_disconnected && this.on_disconnected();
}

function WebsocketHandler(identifier, actions) {
  const exports = { received, connected, disconnected };
  Object.entries(actions).forEach(([message, handler]) => {
    exports[message] = handler.perform
      ? handler.perform.bind(this)(message)
      : handler;
  });
  return exports;
}
