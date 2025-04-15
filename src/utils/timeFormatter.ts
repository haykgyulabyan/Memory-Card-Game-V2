export function formatDuration(milliseconds: number, locale: string = 'en-US'): string {
  if (milliseconds < 0) milliseconds = 0;

  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  const parts: string[] = [];
  const options: Intl.NumberFormatOptions = {
    style: 'unit',
    unitDisplay: 'long',
  };

  if (hours > 0) {
    parts.push(new Intl.NumberFormat(locale, { ...options, unit: 'hour' }).format(hours));
  }
  if (minutes > 0) {
    parts.push(new Intl.NumberFormat(locale, { ...options, unit: 'minute' }).format(minutes));
  }
  if (seconds > 0 || parts.length === 0) {
    parts.push(new Intl.NumberFormat(locale, { ...options, unit: 'second' }).format(seconds));
  }

  if (parts.length === 0) {
    return new Intl.NumberFormat(locale, { ...options, unit: 'second' }).format(0);
  } else if (parts.length === 1) {
    return parts[0];
  } else if (parts.length === 2) {
    return parts.join(', ');
  } else {
    return parts.slice(0, -1).join(', ') + ', ' + parts[parts.length - 1];
  }
}
