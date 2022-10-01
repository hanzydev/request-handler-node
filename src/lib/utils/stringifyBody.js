import qs from 'qs';

/**
 *
 * @param {import('../../../types/interfaces').HeaderResolvable} headers
 * @param {import('../../../types/interfaces').BodyResolvable} body
 * @returns
 */
export default function stringifyBody(headers, body) {
    if (typeof headers !== 'undefined') {
        if (headers['Content-Type'] === 'application/json') {
            body = JSON.stringify(body);
        } else if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            body = qs.stringify(body);
        }
    }

    return body;
}
