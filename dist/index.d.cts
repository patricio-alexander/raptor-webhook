interface RaptorClientOptions {
    host: string;
    port?: string | number;
    secret: string;
    /** Defaults to `http`. Use `https` when the webhook endpoint is TLS-terminated. */
    protocol?: "http" | "https";
}
interface NotifyPayload {
    type_key: string;
    name: string;
    metadata?: Record<string, unknown>;
}
interface NotifySuccess {
    ok: true;
    event_id: string | number;
    type_key: string;
    event: unknown;
}
interface NotifyFailure {
    ok: false;
    error: string;
    status: number | null;
}
type NotifyResult = NotifySuccess | NotifyFailure;
interface RaptorClient {
    notify(payload: NotifyPayload): Promise<NotifyResult>;
    notifyOk(type_key: string, name: string, metadata?: Record<string, unknown>): void;
    notifyFail(type_key: string, name: string, metadata?: Record<string, unknown>): void;
}

declare function createRaptorClient(options: RaptorClientOptions): RaptorClient;

export { type NotifyFailure, type NotifyPayload, type NotifyResult, type NotifySuccess, type RaptorClient, type RaptorClientOptions, createRaptorClient };
