export const LOGS_PER_PERSON_PER_HOUR = Object.freeze({ low: 0.5, medium: 0.8, high: 1.2 });
export const BUNDLE_SIZE = 5;

const validNumber = value => Number.isFinite(Number(value));

export function getTip({ people, duration, intensity }) {
  if (duration > 4) return 'Bring one extra bundle just in case!';
  if (intensity === 'high') return 'High-intensity fires burn bright—keep a little extra wood nearby.';
  if (people >= 8) return 'For a larger group, keep the next bundle within easy reach.';
  return 'You’re set for a cozy, steady campfire.';
}

export function calculateEstimate({ people, duration, intensity }) {
  const rate = LOGS_PER_PERSON_PER_HOUR[intensity];
  const peopleNumber = Number(people);
  const durationNumber = Number(duration);

  if (!validNumber(people) || peopleNumber <= 0 || !validNumber(duration) || durationNumber < 1 || !rate) {
    return { status: 'invalid', logs: null, bundles: null, tip: 'Enter number of people to see your estimate.' };
  }

  const logs = Math.ceil(peopleNumber * durationNumber * rate);
  return { status: 'ready', logs, bundles: Math.ceil(logs / BUNDLE_SIZE), tip: getTip({ people: peopleNumber, duration: durationNumber, intensity }) };
}
