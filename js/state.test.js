import assert from 'node:assert/strict';
import test from 'node:test';
import { createStore } from './state.js';

test('starts with a sample people value and medium intensity', () => {
  const state = createStore().getState();

  assert.equal(state.people, 4);
  assert.equal(state.duration, 2);
  assert.equal(state.intensity, 'medium');
});

test('preserves an empty or zero people input for the empty estimate state', () => {
  const store = createStore();

  store.updateInput('people', '0');
  assert.equal(store.getState().people, 0);
  assert.equal(store.getState().error, '');

  store.updateInput('people', '');
  assert.equal(store.getState().people, '');
  assert.equal(store.getState().error, '');
});

test('reports invalid people and clamps duration to the allowed range', () => {
  const store = createStore();

  store.updateInput('people', '-2');
  assert.match(store.getState().error, /at least 1/i);
  store.updateInput('people', 'campers');
  assert.match(store.getState().error, /valid number/i);

  store.updateInput('duration', '20');
  assert.equal(store.getState().duration, 12);
  store.updateInput('duration', '-4');
  assert.equal(store.getState().duration, 1);
});

test('accepts only the three supported intensity values', () => {
  const store = createStore();

  store.updateInput('intensity', 'high');
  assert.equal(store.getState().intensity, 'high');
  store.updateInput('intensity', 'bonfire');
  assert.equal(store.getState().intensity, 'high');
});
