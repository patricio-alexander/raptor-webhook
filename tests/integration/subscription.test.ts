import { beforeAll, describe, it, expect } from "vitest";
import Subscription from "../../src/";

describe("Intregacion: SDK", () => {
  Subscription.configure({
    apiKey: process.env.TEST_API_KEY!,
  });

  // it("Activa la subscripcion con la licencia con activateSubscription()", async () => {
  //   const subscription = await Subscription.activateSubscription({
  //     licenseKey: "1a3f75b8-681c-4bdc-879e-11d8a1fb2ae6",
  //   });
  //   expect(subscription.error).toBeNull();
  //   expect(subscription.data?.status).toBeDefined();
  // });

  it("Devuelve error si la licencia ha sido revocada o usada con activateSubscription()", async () => {
    const subscription = await Subscription.activateSubscription({
      licenseKey: "1a3f75b8-681c-4bdc-879e-11d8a1fb2ae6",
    });
    expect(subscription.error).toBeDefined();
    expect(subscription.data).toBeNull();
  });

  it("Obtiene los datos de las subscripcion con getSubscriptionInfo()", async () => {
    const subscription = await Subscription.getSubscriptionInfo();
    console.log(subscription);
    expect(subscription.error).toBeNull();
    expect(subscription.data?.subscribed).toBeDefined();
  });
});
