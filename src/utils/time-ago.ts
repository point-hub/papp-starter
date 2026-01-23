const intervals = {
  year: 31536000,
  month: 2592000,
  week: 604800,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
} as const;

type IntervalKey = keyof typeof intervals;

export function timeAgo(input: Date | string | number | undefined) {
  if (input === undefined) {
    return '';
  }

  const date = new Date(input);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  for (const key of Object.keys(intervals) as IntervalKey[]) {
    const value = Math.floor(seconds / intervals[key]);
    if (value >= 1) {
      return `${value} ${key}${value > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}
