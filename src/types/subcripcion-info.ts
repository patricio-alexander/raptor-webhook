export interface SubscriptionInfo {
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
      capabilities: {
        id: number
        code: string,
        name: string,
        is_active: boolean,
        section: {
          id: number,
          key: string,
          name: string,
        },
        module: {
          id: number,
          name: string,
        },
      }[];
    };
  }
  