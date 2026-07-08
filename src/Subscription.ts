import { getErroMessage } from "./utils/error";
import { SubscriptionInfo } from "./types/subcripcion-info";
import { ExchangedLicense } from "./types/exchanged-license";


export interface SubcriptionSDKI {
  configure({ apiKey }: { apiKey: string }): void;
  activateSubscription({
    licenseKey,
  }: {
    licenseKey: string;
  }): Promise<{ error: null; data: ExchangedLicense } | { error: string; data: null }>;
  getSubscriptionInfo(): Promise<
    { error: null; data: SubscriptionInfo } | { error: string; data: null }
  >;
}


export class Subscription implements SubcriptionSDKI {
  private apikey: null | string = null;
  private apiUrl = "https://aplicaciones.marianosamaniego.edu.ec/gestor-proyectos-negocios/api";

  configure({ apiKey }: { apiKey: string }) {
    this.apikey = apiKey;
  }

  async activateSubscription({ licenseKey }: { licenseKey: string }) {
    try {
      const response = await fetch(`${this.apiUrl}/subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apikey}`,
        },
        body: JSON.stringify({
          license_key: licenseKey,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return { error: null, data: data};
    } catch (error) {
      return { error: getErroMessage(error), data: null };
    }
  }

  async getSubscriptionInfo() {
    try {
      if (!this.apikey) {
        throw new Error("No existe apiKey");
      }

      const response = await fetch(`${this.apiUrl}/subscriptions/check`, {
        headers: {
          Authorization: `Bearer ${this.apikey}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return { error: null, data: data  };
    } catch (error) {
      return { error: getErroMessage(error), data: null };
    }
  }
}
