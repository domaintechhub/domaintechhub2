function getEATDateInputValue(daysFromToday: number, now = new Date()): string {
  const dateParts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Nairobi',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const year = Number(dateParts.find((part) => part.type === 'year')?.value);
  const month = Number(dateParts.find((part) => part.type === 'month')?.value);
  const day = Number(dateParts.find((part) => part.type === 'day')?.value);
  const date = new Date(Date.UTC(year, month - 1, day + daysFromToday));

  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
}

export function getTodayDateInputValue(now = new Date()): string {
  return getEATDateInputValue(0, now);
}

export function getTomorrowDateInputValue(now = new Date()): string {
  return getEATDateInputValue(1, now);
}

export function getEATCalendarRange(date: string, time: string): { start: string; end: string } {
  const match = time.match(/^(\d{1,2}):(\d{2}) (AM|PM)$/);
  if (!match) {
    throw new Error(`Invalid EAT time slot: ${time}`);
  }

  const [, hourText, minuteText, period] = match;
  const hour = Number(hourText) % 12 + (period === 'PM' ? 12 : 0);
  const startDate = new Date(`${date}T${String(hour).padStart(2, '0')}:${minuteText}:00+03:00`);
  if (Number.isNaN(startDate.getTime())) {
    throw new Error(`Invalid calendar date: ${date}`);
  }

  const endDate = new Date(startDate.getTime() + 45 * 60 * 1000);
  const formatUtc = (value: Date) => value.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');

  return { start: formatUtc(startDate), end: formatUtc(endDate) };
}
