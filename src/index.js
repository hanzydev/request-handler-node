import fetch from './lib/fetch.js';

import FormData from './lib/struct/FormData.js';
import Response from './lib/struct/Response.js';

import getProvider from './lib/utils/getProvider.js';
import stringifyBody from './lib/utils/stringifyBody.js';

export default fetch;

export { FormData, Response, getProvider, stringifyBody };
