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
  consumer.subscriptions.create(identifier, WebsocketHandler(identifier, actions));

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
    exports[message] = handler.perform ? handler.perform.bind(this)(message) : handler;
  });
  return exports;
}
