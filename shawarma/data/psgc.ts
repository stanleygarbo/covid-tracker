import data from "./modified-psgc.json";

export function getAllRegion() {
  const processedData = data;
  return processedData;
}

export function getRegion(str: string) {
  const region = data.filter((obj) => obj.Code === str);
  return region;
}

export function getAllCityMun(regPSGC: string): any[] {
  let CityMun = [];
  data.map((obj) => {
    if (obj.Code === regPSGC) {
      CityMun = obj.CityMun;
    }
  });
  CityMun?.sort(function (a, b) {
    var textA = a.Name.toUpperCase();
    var textB = b.Name.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  return CityMun;
}
