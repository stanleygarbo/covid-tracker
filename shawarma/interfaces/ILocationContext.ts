export interface ILocation {
  regionPSGC: string;
  regionRes: string;
  cityMunPSGC: string;
}

export interface ILocationContext {
  regionPSGC: string;
  regionRes: string;
  cityMunPSGC: string;
  setRegionPSGC: (str: string) => void;
  setRegionRes: (str: string) => void;
  setCityMunPSGC: (str: string) => void;
}
