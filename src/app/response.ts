export interface ResponseContextType {
  status?: number | null;
  body?: string | Uint8Array | Deno.Reader | undefined;
  headers?: Headers | null;
}

class ResponseContext {
  status: number;
  body: string | Uint8Array | Deno.Reader | undefined;
  headers: Headers;

  constructor({ status, body, headers }: ResponseContextType = {}) {
    this.status = status || 500;
    this.body = body;
    this.headers = headers || new Headers();
  }

  update({ status, body, headers }: ResponseContextType): ResponseContext {
    if (typeof status === "number") {
      this.status = status;
    }
    // Naively replace all headers with new ones
    // There may be instances where we need to update headers in place such the cache policy
    if (headers) {
      for (const [header, value] of headers.values()) {
        this.headers.set(header, value);
      }
    }
    this.body = body;
    return this;
  }
}

export default ResponseContext;
