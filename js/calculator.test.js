import assert from 'node:assert/strict';
import test from 'node:test';
import { BUNDLE_SIZE, calculateEstimate, LOGS_PER_PERSON_PER_HOUR } from './calculator.js';

test('uses named medium rate and rounds logs upward', () => {
  const result = calculateEstimate({ people: 3, duration: 2, intensity: 'medium' });

  assert.equal(LOGS_PER_PERSON_PER_HOUR.medium, 0.8);
  assert.equal(result.logs, 5);
  assert.equal(result.bundles, 1);
});

test('rounds bundle count upward using the named bundle size', () => {
  const result = calculateEstimate({ people: 5, duration: 3, intensity: 'high' });

  assert.equal(BUNDLE_SIZE, 5);
  assert.equal(result.logs, 18);
  assert.equal(result.bundles, 4);
});

test('returns contextual tips for long, intense, and large campfires', () => {
  assert.match(calculateEstimate({ people: 2, duration: 5, intensity: 'low' }).tip, /extra bundle/i);
  assert.match(calculateEstimate({ people: 2, duration: 2, intensity: 'high' }).tip, /high-intensity/i);
  assert.match(calculateEstimate({ people: 8, duration: 2, intensity: 'medium' }).tip, /group/i);
});

test('returns an invalid status instead of NaN for empty people', () => {
  const result = calculateEstimate({ people: '', duration: 2, intensity: 'medium' });

  assert.equal(result.status, 'invalid');
  assert.equal(result.logs, null);
  assert.equal(result.bundles, null);
});
