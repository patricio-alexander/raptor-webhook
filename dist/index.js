// src/client.ts
function getErrorMessage(error) {
  if (error instanceof Error) return error.message;
  return String(error);
}
function joinUrl(base, ...parts) {
  const normalizedBase = base.replace(/\/+$/, "");
  const path = parts.filter(Boolean).map((part) => part.replace(/^\/+|\/+$/g, "")).filter(Boolean).join("/");
  return path ? `${normalizedBase}/${path}` : normalizedBase;
}
function buildEventsUrl(options) {
  const protocol = options.protocol ?? "http";
  const host = options.host.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  const port = options.port !== void 0 && options.port !== "" ? `:${options.port}` : "";
  const origin = `${protocol}://${host}${port}`;
  return joinUrl(origin, options.apiPrefix ?? "");
}
function createRaptorClient(options) {
  if (!options.host) {
    throw new Error("createRaptorClient: `host` is required");
  }
  if (!options.secret) {
    throw new Error("createRaptorClient: `secret` is required");
  }
  const eventsUrl = buildEventsUrl(options);
  const authorization = `Bearer ${options.secret}`;
  async function notify(payload) {
    try {
      const response = await fetch(eventsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorization
        },
        body: JSON.stringify({
          type_key: payload.type_key,
          name: payload.name,
          metadata: payload.metadata ?? {}
        })
      });
      let data = {};
      try {
        data = await response.json();
      } catch {
      }
      if (!response.ok) {
        return {
          ok: false,
          error: typeof data.error === "string" ? data.error : `Request failed with status ${response.status}`,
          status: response.status
        };
      }
      return {
        ok: true,
        event_id: data.event_id ?? data.id,
        type_key: typeof data.type_key === "string" ? data.type_key : payload.type_key,
        event: data.event ?? data
      };
    } catch (error) {
      return {
        ok: false,
        error: getErrorMessage(error),
        status: null
      };
    }
  }
  function fireAndForget(payload) {
    void notify(payload);
  }
  return {
    notify,
    notifyOk(type_key, name, metadata) {
      fireAndForget({ type_key, name, metadata });
    },
    notifyFail(type_key, name, metadata) {
      fireAndForget({ type_key, name, metadata });
    }
  };
}
export {
  createRaptorClient
};
//# sourceMappingURL=index.js.map