export function checkLastmodUnderAge(lastmod: string, maxDays: number) {
  const date = new Date(lastmod);
  const today = new Date();

  const diff = today.getTime() - date.getTime();
  const sec = diff / 1000;
  const min = sec / 60;
  const hour = min / 60;
  const days = hour / 24;

  if (days < maxDays) {
    return true;
  }

  return false;
}
