import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getTodayDateInputValue,
  getTomorrowDateInputValue,
  getEATCalendarRange,
} from '../calendar';

describe('calendar utility - getTodayDateInputValue and getTomorrowDateInputValue', () => {
  it('formats dates in YYYY-MM-DD pattern', () => {
    const today = getTodayDateInputValue();
    assert.match(today, /^\d{4}-\d{2}-\d{2}$/);

    const tomorrow = getTomorrowDateInputValue();
    assert.match(tomorrow, /^\d{4}-\d{2}-\d{2}$/);
  });

  it('tomorrow date is strictly after today', () => {
    const today = new Date(getTodayDateInputValue());
    const tomorrow = new Date(getTomorrowDateInputValue());
    assert.ok(tomorrow.getTime() > today.getTime());
  });

  it('calculates consistent date for fixed timestamp in EAT timezone (UTC+3)', () => {
    // 2026-06-15T22:30:00Z is 2026-06-16 01:30:00 in Africa/Nairobi
    const fixedUtcDate = new Date('2026-06-15T22:30:00Z');
    const eatDate = getTodayDateInputValue(fixedUtcDate);
    assert.equal(eatDate, '2026-06-16');

    const tomorrowEat = getTomorrowDateInputValue(fixedUtcDate);
    assert.equal(tomorrowEat, '2026-06-17');
  });
});

describe('calendar utility - getEATCalendarRange', () => {
  it('calculates 45-minute booking window in UTC formatted string', () => {
    const range = getEATCalendarRange('2026-06-20', '10:00 AM');
    // 10:00 AM EAT is 07:00 AM UTC
    assert.equal(range.start, '20260620T070000Z');
    // 45 minutes later: 07:45 AM UTC
    assert.equal(range.end, '20260620T074500Z');
  });

  it('correctly handles afternoon PM time slots', () => {
    const range = getEATCalendarRange('2026-06-20', '02:30 PM');
    // 02:30 PM (14:30) EAT is 11:30 AM UTC
    assert.equal(range.start, '20260620T113000Z');
    // 45 minutes later: 12:15 PM UTC
    assert.equal(range.end, '20260620T121500Z');
  });

  it('throws on invalid time slot format', () => {
    assert.throws(
      () => getEATCalendarRange('2026-06-20', '14:30'),
      /Invalid EAT time slot/
    );
    assert.throws(
      () => getEATCalendarRange('2026-06-20', 'invalid-time'),
      /Invalid EAT time slot/
    );
  });

  it('throws on invalid date string', () => {
    assert.throws(
      () => getEATCalendarRange('invalid-date', '10:00 AM'),
      /Invalid calendar date/
    );
  });
});
