export interface IHospitalsTemplate {
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
  data: {
    Hfhudcode: string;
    Cfname: string;
    Reportdate: string;
    Icu_v: string;
    Icu_o: string;
    Isolbed_v: string;
    Isolbed_o: string;
    Icu_v_nc: string;
    Icu_o_nc: string;
    Nonicu_v_nc: string;
    Nonicu_o_nc: string;
  }[];
}
