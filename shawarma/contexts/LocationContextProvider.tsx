import React, { createContext, useContext, useEffect, useState } from "react";
import { ILocationContext, ILocation } from "../interfaces/ILocationContext";

const LocationContext = createContext<ILocationContext>({
  regionPSGC: "",
  regionRes: "",
  cityMunPSGC: "",
  setRegionPSGC: () => {},
  setRegionRes: () => {},
  setCityMunPSGC: () => {},
});

export const useLocation = () => {
  return useContext(LocationContext);
};

export const LocationContextProvider: React.FC<{ children: React.ReactChild }> =
  ({ children }) => {
    const [regionPSGCState, setRegionPSGCState] = useState<string>("");
    const [regionResState, setRegionResState] = useState<string>("");
    const [cityMunPSGCState, setCityMunPSGCState] = useState<string>("");

    useEffect(() => {
      const loc = {
        regionPSGC: localStorage.getItem("regionPSGC")
          ? localStorage.getItem("regionPSGC")
          : "all",
        regionRes: localStorage.getItem("regionRes")
          ? localStorage.getItem("regionRes")
          : "all",
        cityMunPSGC: localStorage.getItem("cityMunPSGC")
          ? localStorage.getItem("cityMunPSGC")
          : "all",
      };

      setRegionPSGCState(loc.regionPSGC);
      setRegionResState(loc.regionRes);
      setCityMunPSGCState(loc.cityMunPSGC);
    }, []);

    function setRegionPSGC(str: string) {
      localStorage.setItem("regionPSGC", str);
      setRegionPSGCState(str);
    }

    function setCityMunPSGC(str: string) {
      localStorage.setItem("cityMunPSGC", str);
      setCityMunPSGCState(str);
    }

    function setRegionRes(str: string) {
      localStorage.setItem("regionRes", str);
      setRegionResState(str);
    }

    return (
      <LocationContext.Provider
        value={{
          regionPSGC: regionPSGCState,
          cityMunPSGC: cityMunPSGCState,
          regionRes: regionResState,
          setCityMunPSGC,
          setRegionPSGC,
          setRegionRes,
        }}
      >
        {children}
      </LocationContext.Provider>
    );
  };
