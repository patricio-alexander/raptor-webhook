"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  createRaptorClient: () => createRaptorClient
});
module.exports = __toCommonJS(index_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRaptorClient
});
//# sourceMappingURL=index.cjs.map