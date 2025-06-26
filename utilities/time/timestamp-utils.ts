export function getTimestamp(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');

  const dd = pad(now.getDate());
  const mm = pad(now.getMonth() + 1);
  const yyyy = now.getFullYear();
  const HH = pad(now.getHours());
  const MM = pad(now.getMinutes());

  return `${dd}${mm}${yyyy}${HH}${MM}`;
}
