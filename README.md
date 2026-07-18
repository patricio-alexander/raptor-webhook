# @raptorsolutions/webhook-client

Client Node/server para registrar eventos webhook hacia el gestor Raptor. Paquete **interno** — no se publica en npm; se instala desde GitHub.

## Instalación

Desde la línea de comandos:

```bash
npm install github:patricio-alexander/raptor-webhook
```

O en el `package.json` del proyecto consumidor:

```json
{
  "dependencies": {
    "@raptorsolutions/webhook-client": "github:patricio-alexander/raptor-webhook"
  }
}
```

Opcionalmente fija una rama, tag o commit:

```json
"@raptorsolutions/webhook-client": "github:patricio-alexander/raptor-webhook#main"
```

Requiere acceso al repositorio privado de GitHub (SSH o token según tu entorno).

## Uso

```ts
import { createRaptorClient } from "@raptorsolutions/webhook-client";

const raptor = createRaptorClient({
  host: process.env.RAPTOR_WEBHOOK_HOST!,
  port: process.env.RAPTOR_WEBHOOK_PORT,
  secret: process.env.GESTOR_SYNC_SECRET!,
});

// Fire-and-forget
raptor.notifyOk("order.created", "Pedido #1042", { orderId: 1042 });
raptor.notifyFail("order.create_failed", "Error al crear pedido", {
  message: "...",
});

// Await cuando necesites el resultado
const result = await raptor.notify({
  type_key: "order.created",
  name: "Pedido #1042",
  metadata: { orderId: 1042 },
});

if (result.ok) {
  console.log(result.event_id, result.type_key, result.event);
} else {
  console.error(result.error, result.status);
}
```

## Request

`POST {protocol}://{host}:{port}/raptorsolutions/api/webhooks/app-events`

Ejemplo:

`POST http://localhost:3000/raptorsolutions/api/webhooks/app-events`

Headers:

- `Content-Type: application/json`
- `Authorization: Bearer {secret}`

Body:

```json
{
  "type_key": "order.created",
  "name": "Pedido #1042",
  "metadata": { "orderId": 1042 }
}
```

## API

### `createRaptorClient(options)`

| Opción | Tipo | Descripción |
|---|---|---|
| `host` | `string` | Host del webhook (requerido) |
| `port` | `string \| number` | Puerto opcional |
| `secret` | `string` | Token Bearer (`GESTOR_SYNC_SECRET`) |
| `protocol` | `"http" \| "https"` | Default: `http` |

### `notify({ type_key, name, metadata })`

Envía el evento y retorna:

- `{ ok: true, event_id, type_key, event }`
- `{ ok: false, error, status }`

### `notifyOk(type_key, name, metadata?)` / `notifyFail(...)`

Igual que `notify`, pero fire-and-forget (no hace `await`).

## Variables de entorno

| Variable | Descripción |
|---|---|
| `RAPTOR_WEBHOOK_HOST` | Host del servicio webhook |
| `RAPTOR_WEBHOOK_PORT` | Puerto |
| `GESTOR_SYNC_SECRET` | Secret para `Authorization: Bearer ...` |

## Scripts

| Comando | Descripción |
|---|---|
| `npm run build` | Compila el SDK con tsup |
| `npm test` | Ejecuta tests con Vitest |
