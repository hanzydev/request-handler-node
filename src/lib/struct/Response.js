export default class Response {
    /**
     * @type {import("http").IncomingMessage}
     */
    data;

    /**
     *
     * @param {import("http").IncomingMessage} data
     */
    constructor(data) {
        this.data = data;
    }

    /**
     *
     * @returns {Promise<Record<any,any>>}
     */
    json() {
        return new Promise((resolve, reject) => {
            let data = '';

            this.data.on('data', (chunk) => {
                data += chunk;
            });

            this.data.on('end', () => {
                resolve(JSON.parse(data));
            });

            this.data.on('error', (error) => {
                reject(error);
            });
        });
    }

    /**
     *
     * @returns {Promise<string>}
     */
    text() {
        return new Promise((resolve, reject) => {
            let data = '';

            this.data.on('data', (chunk) => {
                data += chunk;
            });

            this.data.on('end', () => {
                resolve(data);
            });

            this.data.on('error', (error) => {
                reject(error);
            });
        });
    }

    /**
     * @returns {Promise<Buffer>}
     */
    buffer() {
        return new Promise((resolve, reject) => {
            let data = Buffer.alloc(0);

            this.data.on('data', (chunk) => {
                data = Buffer.concat([data, chunk]);
            });

            this.data.on('end', () => {
                resolve(data);
            });

            this.data.on('error', (error) => {
                reject(error);
            });
        });
    }
}
