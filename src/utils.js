export function stripHtml(html) {
  if (!html) {
    return 'No summary available.';
  }

  const document = new DOMParser().parseFromString(
    html,
    'text/html'
  );

  return document.body.textContent?.trim()
    || 'No summary available.';
}

export function formatDate(timestamp) {
  if (!timestamp) {
    return 'Not available';
  }

  const date = new Date(timestamp * 1000);

  if (Number.isNaN(date.getTime())) {
    return 'Not available';
  }

  return date.toLocaleString();
}

export function displayValue(value) {
  return value === null ||
    value === undefined ||
    value === ''
    ? 'Not available'
    : value;
}

export function formatGenres(genres) {
  return genres?.length
    ? genres.join(', ')
    : 'Not available';
}