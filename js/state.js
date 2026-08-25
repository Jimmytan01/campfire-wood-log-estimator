export const INTENSITIES = Object.freeze(['low', 'medium', 'high']);
export const DURATION_MIN = 1;
export const DURATION_MAX = 12;

const DEFAULT_STATE = Object.freeze({ people: 4, duration: 2, intensity: 'medium', isCalculating: false, error: '' });

const snapshot = state => ({ ...state });

export function createStore(initial = {}) {
  let state = { ...DEFAULT_STATE, ...initial };
  const listeners = new Set();

  const notify = () => listeners.forEach(listener => listener(snapshot(state)));

  return {
    getState: () => snapshot(state),
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    updateInput(field, value) {
      if (field === 'people') {
        const raw = String(value ?? '').trim();
        if (raw === '') state = { ...state, people: '', error: '' };
        else if (!Number.isFinite(Number(raw))) state = { ...state, people: raw, error: 'Please enter a valid number of people.' };
        else if (Number(raw) < 0) state = { ...state, people: Number(raw), error: 'Number of people must be at least 1.' };
        else state = { ...state, people: Number(raw), error: '' };
      } else if (field === 'duration') {
        const number = Number(value);
        const duration = Number.isFinite(number) ? Math.min(DURATION_MAX, Math.max(DURATION_MIN, number)) : DURATION_MIN;
        state = { ...state, duration, error: Number.isFinite(number) ? '' : 'Choose a duration from 1 to 12 hours.' };
      } else if (field === 'intensity' && INTENSITIES.includes(value)) {
        state = { ...state, intensity: value };
      }
      notify();
    },
    setCalculating(isCalculating) {
      state = { ...state, isCalculating: Boolean(isCalculating) };
      notify();
    }
  };
}
