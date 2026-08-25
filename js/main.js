import { calculateEstimate } from './calculator.js';
import { createStore } from './state.js';
import { debounce } from './ui.js';
import { getElements, render } from './render.js';

const elements = getElements();
const store = createStore();
const recalculate = debounce(() => store.setCalculating(false), 180);

const updateView = state => render(elements, state, calculateEstimate(state));
store.subscribe(updateView);

elements.people.addEventListener('input', event => {
  store.updateInput('people', event.target.value);
  store.setCalculating(true);
  recalculate();
});
elements.duration.addEventListener('input', event => {
  store.updateInput('duration', event.target.value);
  store.setCalculating(true);
  recalculate();
});
elements.intensityButtons.forEach(button => button.addEventListener('click', () => {
  store.updateInput('intensity', button.dataset.intensity);
  store.setCalculating(true);
  recalculate();
}));

const initialState = store.getState();
elements.people.value = initialState.people;
elements.duration.value = initialState.duration;
setTimeout(() => {
  store.setCalculating(false);
}, 120);
