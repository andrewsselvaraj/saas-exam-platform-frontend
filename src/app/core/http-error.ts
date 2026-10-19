import { HttpErrorResponse } from '@angular/common/http';

/** A short message for a failed API call. `notFound` is shown for 404s (the backend's NotFoundException). */
export function describeHttpError(err: HttpErrorResponse, notFound = 'Not found.'): string {
  if (err.status === 0 || err.status >= 500) {
    return 'The exam service is not reachable right now.';
  }
  if (err.status === 404) {
    return notFound;
  }
  return `The server answered ${err.status}.`;
}
