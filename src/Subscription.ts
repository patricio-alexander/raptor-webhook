import { getErroMessage } from "./utils/error";

export interface SubcriptionSDKI {
  configure({ apiKey }: { apiKey: string }): void;
  activateSubscription({
    licenseKey,
  }: {
    licenseKey: string;
  }): Promise<{ error: null; data: any } | { error: string; data: null }>;
  getSubscriptionInfo(): Promise<
    { error: null; data: any } | { error: string; data: null }
  >;
}

interface SubscriptionInfo {
  subscribed: boolean;
  subscription: {
    id: number;
    plan_name: string;
    period: "MONTHLY" | "ANNUALLY";
    status: "ACTIVE" | "EXPIRED" | "CANCELED";
    start_at: string;
    expires_at: string;
    modules: {
      id: number;
      name: string;
      sections: string[];
    }[];
    offers: {
      name: string;
      price: number;
      start_at: string;
      expires_at: string;
      modules: {
        id: number;
        name: string;
      }[];
    };
  } | null;
}

interface ExchangedLicense {
  id: number;
  app_hash: string;
  plan_price_id: number;
  start_at: string;
  expires_at: string;
  status: "ACTIVE";
  license_key: string;
}

export class Subscription implements SubcriptionSDKI {
  private apikey: null | string = null;
  private apiUrl =
    "https://aplicaciones.marianosamaniego.edu.ec/gestor-proyectos-negocios/api";

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
          Origin: "https://aplicaciones.marianosamaniego.edu.ec",
        },
        body: JSON.stringify({
          license_key: licenseKey,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return { error: null, data: data as ExchangedLicense };
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
          Origin: "https://aplicaciones.marianosamaniego.edu.ec",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      return { error: null, data: data as SubscriptionInfo };
    } catch (error) {
      return { error: getErroMessage(error), data: null };
    }
  }
}
