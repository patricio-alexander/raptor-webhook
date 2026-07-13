interface Price {
  prices: number;
  period: "MONTHLY" | "ANNUALLY";
}

interface Module {
  name: string;
  description: string;
}

export interface PlanInfo {
  name: string;
  prices: Price[];
  modules: Module[] | null;
}
