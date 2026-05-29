const inWebWorker = typeof WorkerGlobalScope !== "undefined" &&
    self instanceof WorkerGlobalScope;
const root = inWebWorker
    ? self
    : typeof window !== "undefined"
        ? window
        : globalThis;
export const fetch = root.fetch.bind(root);
export const Headers = root.Headers;
export const Request = root.Request;
export const Response = root.Response;
