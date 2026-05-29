declare global {
    var WorkerGlobalScope: any;
}
export declare const fetch: any;
export declare const Headers: {
    new (init?: HeadersInit): Headers;
    prototype: Headers;
};
export declare const Request: {
    new (input: globalThis.RequestInfo | URL, init?: globalThis.RequestInit): Request;
    prototype: Request;
};
export declare const Response: {
    new (body?: BodyInit, init?: ResponseInit): Response;
    prototype: Response;
    error(): Response;
    redirect(url: string | URL, status?: number): Response;
};
export type RequestInfo = Parameters<typeof window.fetch>[0];
export type RequestInit = Parameters<typeof window.fetch>[1];
