interface SubscriptionInfo {
    maintenance: boolean;
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
            sections: {
                id: number;
                key: string;
                name: string;
                max_records_limit: number;
                usage_count: number;
            };
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
        capabilities: Record<string, boolean>;
    };
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

interface UsageInfo {
    max_limit: number;
    usage: number;
    remaining: number;
}

interface SubcriptionSDKI {
    configure({ apiKey }: {
        apiKey: string;
    }): void;
    incrementUsage({ section, }: {
        section: string;
    }): Promise<{
        error: null | string;
        data: UsageInfo | null;
    }>;
    activateSubscription({ licenseKey, }: {
        licenseKey: string;
    }): Promise<{
        error: null | string;
        data: ExchangedLicense | null;
    }>;
    getSubscriptionInfo(): Promise<{
        error: null | string;
        data: SubscriptionInfo | null;
    }>;
}
declare class Subscription implements SubcriptionSDKI {
    private apikey;
    private apiUrl;
    configure({ apiKey }: {
        apiKey: string;
    }): void;
    activateSubscription({ licenseKey }: {
        licenseKey: string;
    }): Promise<{
        error: null;
        data: any;
    } | {
        error: string;
        data: null;
    }>;
    getSubscriptionInfo(): Promise<{
        error: null;
        data: any;
    } | {
        error: string;
        data: null;
    }>;
    incrementUsage({ section }: {
        section: string;
    }): Promise<{
        error: null | string;
        data: UsageInfo | null;
    }>;
}

declare const _default: Subscription;

export { _default as default };
