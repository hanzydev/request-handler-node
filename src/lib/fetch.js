import Response from './struct/Response.js';
import getProvider from './utils/getProvider.js';
import stringifyBody from './utils/stringifyBody.js';

/**
 *
 * @param {string} url
 * @param {import("../../types/interfaces").RequestOptions} [options]
 * @returns {Promise<Response>}
 */
export default function fetch(url, options = {}) {
    const provider = getProvider(url);

    try {
        if ('body' in options) {
            options.body = stringifyBody(options.headers, options.body);
        }
    } catch {}

    if ('query' in options) {
        if (options.query instanceof URLSearchParams) {
            url += '?' + options.query.toString();
        } else {
            url += '?' + new URLSearchParams(options.query).toString();
        }
    }

    return new Promise((resolve) => {
        const req = provider.request(url, options, (data) => {
            resolve(new Response(data));
        });

        if (options.body) {
            req.write(options.body);
        }
        
        req.end();
    });
}
