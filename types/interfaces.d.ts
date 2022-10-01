export interface RequestOptions {
    method?: RequestMethods;
    headers?: HeaderResolvable;
    signal?: AbortSignal;
    agent?: boolean | Agent;
    body?: BodyResolvable;
    query?: QueryResolvable;
}

export type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH';

export type HeaderResolvable = Record<string, string | string[] | undefined>;

export type BodyResolvable =
    | string
    | Buffer
    | Uint8Array
    | ReadableStream
    | Blob
    | ArrayBuffer
    | Record<any, any>;

export type QueryResolvable = Record<string, string | undefined> | URLSearchParams;

export interface FormDataPushOptions {
    filename?: string;
    contentType?: string;
}

export interface FormDataOptions {
    detectContentType?: boolean;
    detectFilename?: boolean;
}
