import { fileTypeFromBuffer, fileTypeFromFile } from 'file-type';

export default class FormData {
    /**
     * @type {string}
     */
    boundary = `--------------------------DelieverXD`;

    /**
     * @type {Buffer[]}
     */
    buffers = [];

    /**
     * @type {boolean}
     */
    detectContentType;

    /**
     * @type {boolean}
     */
    detectFilename;

    /**
     *
     * @param {import("../../../types/interfaces").FormDataOptions} options
     */
    constructor(options = {}) {
        this.detectContentType = options.detectContentType ?? true;
        this.detectFilename = options.detectFilename ?? true;
    }

    /**
     *
     * @param {string} key
     * @param {any} data
     * @param {import("../../../types/interfaces").FormDataPushOptions} options
     * @returns {Promise<void>}
     */
    async push(key, data, options = {}) {
        let str = `\r\n--${this.boundary}\r\nContent-Disposition: form-data; name="${key}"`;

        let filename = options.filename;

        if ('filename' in options) {
            str += `; filename="${filename}"`;
        } else if (this.detectFilename) {
            if (data instanceof Buffer) {
                const type = await fileTypeFromBuffer(data);
                if (type) {
                    filename = `file.${type.ext}`;
                }
            } else if (typeof data === 'string') {
                const type = await fileTypeFromFile(data);
                if (type) {
                    filename = `file.${type.ext}`;
                }
            }
        }

        let contentType;

        if (this.detectContentType) {
            if (filename) {
                const type = await fileTypeFromFile(data);

                if (type) {
                    contentType = type.mime;
                }
            } else if (Buffer.isBuffer(data)) {
                const type = await fileTypeFromFile(data);

                if (type) {
                    contentType = (await fileTypeFromBuffer(Buffer.from(data))).mime;
                }
            } else if (ArrayBuffer.isView(data)) {
                contentType = 'application/octet-stream';
            } else if (typeof data === 'object') {
                contentType = 'application/json';
            }
        }

        if (!(data instanceof Uint8Array) && ArrayBuffer.isView(data)) {
            data = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        } else if (contentType === 'application/json') {
            data = JSON.stringify(data);
        } else {
            data = Buffer.from('' + data);
        }

        if (contentType !== 'undefined') {
            str += `\r\nContent-Type: ${contentType}`;
        }

        str += `\r\n\r\n${data}`;

        this.buffers.push(Buffer.from(str));
    }

    /**
     *
     * @param {import("../../../types/interfaces").HeaderResolvable} userHeaders
     * @returns
     */
    getHeaders(userHeaders) {
        const headers = {
            'Content-Type': `multipart/form-data; boundary=${this.boundary}`,
            ...userHeaders,
        };

        return headers;
    }

    getBuffer() {
        this.buffers.push(Buffer.from('\r\n--' + this.boundary + '--'));
        return Buffer.concat(this.buffers);
    }
}
