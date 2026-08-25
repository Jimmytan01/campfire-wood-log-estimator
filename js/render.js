export function getElements() {
  return {
    people: document.querySelector('#people'),
    duration: document.querySelector('#duration'),
    durationOutput: document.querySelector('#duration-output'),
    intensityButtons: [...document.querySelectorAll('[data-intensity]')],
    error: document.querySelector('#error-message'),
    results: document.querySelector('#results'),
    status: document.querySelector('#result-status'),
    metrics: document.querySelector('#metrics'),
    emptyState: document.querySelector('#empty-state'),
    logs: document.querySelector('#logs-value'),
    bundles: document.querySelector('#bundles-value'),
    tip: document.querySelector('#tip-message')
  };
}

const setText = (element, value) => { element.textContent = value; element.classList.remove('skeleton', 'skeleton-number'); };

export function render(elements, state, estimate) {
  elements.people.value = state.people;
  elements.duration.value = state.duration;
  elements.durationOutput.innerHTML = `${state.duration} <span>hrs</span>`;
  elements.intensityButtons.forEach(button => {
    const active = button.dataset.intensity === state.intensity;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  elements.error.textContent = state.error;
  elements.error.hidden = !state.error;

  const hasEmptyPeople = state.people === '' || state.people === 0;
  const showEmpty = !state.error && hasEmptyPeople && !state.isCalculating;
  elements.emptyState.hidden = !showEmpty;
  elements.metrics.hidden = showEmpty;
  elements.results.classList.toggle('is-loading', state.isCalculating);
  elements.status.innerHTML = state.isCalculating ? '<span class="status-dot"></span> Updating' : '<span class="status-dot"></span> Ready';

  if (state.isCalculating) return;
  if (estimate.status === 'ready') {
    setText(elements.logs, estimate.logs);
    setText(elements.bundles, estimate.bundles);
    elements.tip.textContent = estimate.tip;
  } else {
    setText(elements.logs, '—');
    setText(elements.bundles, '—');
    elements.tip.textContent = state.error || estimate.tip;
  }
}
