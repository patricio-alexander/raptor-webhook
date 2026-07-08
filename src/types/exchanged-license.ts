export interface ExchangedLicense {
    id: number;
    app_hash: string;
    plan_price_id: number;
    start_at: string;
    expires_at: string;
    status: "ACTIVE";
    license_key: string;
  }