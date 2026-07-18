export interface RaptorClientOptions {
  host: string;
  port?: string | number;
  secret: string;
  /** Defaults to `http`. Use `https` when the webhook endpoint is TLS-terminated. */
  protocol?: "http" | "https";
}

export interface NotifyPayload {
  type_key: string;
  name: string;
  metadata?: Record<string, unknown>;
}

export interface NotifySuccess {
  ok: true;
  event_id: string | number;
  type_key: string;
  event: unknown;
}

export interface NotifyFailure {
  ok: false;
  error: string;
  status: number | null;
}

export type NotifyResult = NotifySuccess | NotifyFailure;

export interface RaptorClient {
  notify(payload: NotifyPayload): Promise<NotifyResult>;
  notifyOk(
    type_key: string,
    name: string,
    metadata?: Record<string, unknown>,
  ): void;
  notifyFail(
    type_key: string,
    name: string,
    metadata?: Record<string, unknown>,
  ): void;
}
