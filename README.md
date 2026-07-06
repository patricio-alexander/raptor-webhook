# subify

SDK para interactuar con la API de gestor de proyectos.

## Instalación

```bash
npm install subify
```

## Uso

```ts
import Subify from "subify";

Subify.configure({ apiKey: "tu-api-key" });

const subscription = await Subify.getSubscriptionInfo();
if (subscription.error) {
  console.error(subscription.error);
} else {
  console.log(subscription.data);
}

const result = await Subify.activateSubscription({
  licenseKey: "XXXX-XXXX-XXXX",
});
```

## API

### `configure({ apiKey })`

Configura la API key para las peticiones.

### `getSubscriptionInfo()`

Obtiene la información de la suscripción activa.

```ts
interface SubscriptionInfo {
  subscribed: boolean;
  subscription: {
    id: number;
    plan_name: string;
    period: "MONTHLY" | "ANNUALLY";
    status: "ACTIVE" | "EXPIRED" | "CANCELED";
    start_at: string;
    expires_at: string;
    modules: { id: number; name: string; sections: string[] }[];
    offers: {
      name: string;
      price: number;
      start_at: string;
      expires_at: string;
      modules: { id: number; name: string }[];
    };
  } | null;
}
```

### `activateSubscription({ licenseKey })`

Activa una suscripción usando un license key.

## Variables de entorno

| Variable | Descripción |
|---|---|
| `TEST_API_KEY` | API key para tests de integración |


## Scripts

| Comando | Descripción |
|---|---|
| `npm run build` | Compila el SDK con tsup |
| `npm test` | Ejecuta tests con Vitest |

## Tests

```bash
npm test
```

Requiere la variable `TEST_API_KEY` configurada en el entorno.
