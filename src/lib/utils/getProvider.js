import https from 'node:https';
import http from 'node:http';

/**
 *
 * @param {string} url
 * @returns {http | https}
 */
export default function getProvider(url) {
    const { protocol } = new URL(url);

    switch (protocol) {
        case 'https:':
            return https;
        case 'http:':
            return http;
        default:
            throw new Error(`Unsupported protocol: ${protocol}`);
    }
}
