/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
import { ApiError } from './errors';

function parseJSON(response) {
  const isEmpty = response.headers.get('content-length')
    ? parseInt(response.headers.get('content-length'), 10) === 0
    : 0;
  if (response.status === 204 || response.status === 205 || isEmpty) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new ApiError(response);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default async function request(url, options) {
  let fullUrl = url;

  options = options || {};

  options.headers = options.headers || {};

  if (options.body) {
    options.body = JSON.stringify(options.body);
    options.headers['Content-Type'] = 'application/json';
  }

  options.mode = options.mode || 'same-origin';

  if (options && options.searchParams) {
    const params = new URLSearchParams();
    options.searchParams.forEach(sp => {
      params.append(sp.name, sp.value);
    });
    fullUrl += `?${params.toString()}`;
  }

  const fetchResponse = await fetch(fullUrl.toString(), options);
  const response = await checkStatus(fetchResponse);
  return parseJSON(response);
}
