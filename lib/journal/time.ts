/*
 * Journal dates are entered in Keystatic as local Sri Lanka time without an
 * offset ("2026-10-04T09:00"). Everything public — schema.org, RSS, sitemaps,
 * scheduling — uses the full ISO form with the +05:30 offset.
 */

const OFFSET = "+05:30";
const TIME_ZONE = "Asia/Colombo";

/** "2026-10-04T09:00" → "2026-10-04T09:00:00+05:30". Values that already carry an offset pass through. */
export function toIsoDateTime(local: string): string {
  if (/(Z|[+-]\d{2}:?\d{2})$/.test(local)) return local;
  const withSeconds = /T\d{2}:\d{2}$/.test(local) ? `${local}:00` : local.includes("T") ? local : `${local}T00:00:00`;
  return `${withSeconds}${OFFSET}`;
}

export function toTimestamp(local: string): number {
  return new Date(toIsoDateTime(local)).getTime();
}

const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: TIME_ZONE });
const shortDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: TIME_ZONE });

/** "4 October 2026" */
export function formatLongDate(iso: string): string {
  return longDate.format(new Date(iso));
}

/** "4 Oct 2026" */
export function formatShortDate(iso: string): string {
  return shortDate.format(new Date(iso));
}

/** RFC 822 date for RSS. */
export function toRfc822(iso: string): string {
  return new Date(iso).toUTCString();
}

const clock = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: TIME_ZONE });
const dayKey = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: TIME_ZONE });

/** "14:32" in Sri Lanka time. */
export function formatClock(iso: string): string {
  return clock.format(new Date(iso));
}

/** "2026-10-04" in Sri Lanka time — for grouping a news feed by day. */
export function localDay(iso: string): string {
  return dayKey.format(new Date(iso));
}
