export interface IHomeTemplate {
  refetch: () => void;
  error: unknown;
  isLoading: boolean;
  data: {
    CasesReport: {
      HealthStatus: string;
      Count: number;
    }[];
    CasesChartData: {
      Date: Date;
      Count: number;
    }[];
    DeathsChartData: {
      Date: Date;
      Count: number;
    }[];
    RecoveriesChartData: {
      Date: Date;
      Count: number;
    }[];
  };
}
