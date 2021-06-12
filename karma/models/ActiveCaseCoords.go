package models

import (
	"02_covid_tracker/entities"
	"database/sql"
)


type ActiveCaseCoordsModel struct {
	DB *sql.DB
}

func (m ActiveCaseCoordsModel) GetAll() ([]entities.ActiveCaseCoords, error){
	casesCoords := make([]entities.ActiveCaseCoords,5)
	
	res, err := m.DB.Query("SELECT DISTINCT id, lat, lng, type FROM (SELECT DISTINCT id, lat,lng, type FROM coords LEFT JOIN cases c ON c.BarangayPSGC = CONCAT('PH0',coords.id) WHERE HealthStatus = 'MILD' OR HealthStatus = 'MODERATE' OR HealthStatus='CRITICAL' OR HealthStatus = 'SEVERE' OR HealthStatus = 'ASYMPTOMATIC' UNION ALL SELECT DISTINCT id,lat,lng,type FROM coords LEFT JOIN cases c ON c.BarangayPSGC = CONCAT('PH',coords.id) WHERE HealthStatus = 'MILD' OR HealthStatus = 'MODERATE' OR HealthStatus='CRITICAL' OR HealthStatus = 'SEVERE' OR HealthStatus = 'ASYMPTOMATIC')t1 WHERE type='southwest' or type='northeast' or type='location';")
	if err != nil{
		return nil, err
	}

	i:=0

	caseCoords := entities.ActiveCaseCoords{}

	for res.Next() {
		coords := entities.CoordsInfo{}
		res.Scan(&coords.Id, &coords.Lat, &coords.Lng, &coords.Type)

		PAR := entities.Viewport{}
		PAR.NorthEast.Lat=21.2412572
		PAR.NorthEast.Lng=127.6444784
		PAR.SouthWest.Lat=4.2259
		PAR.SouthWest.Lng=116.1474999


		caseCoords.PSGC = coords.Id
		// if coords.Type == "location" {
		// 	caseCoords.Location.Lat = coords.Lat
		// 	caseCoords.Location.Lng = coords.Lng
		// }
		if coords.Type == "southwest" {
				caseCoords.Viewport.SouthWest.Lat = coords.Lat
				caseCoords.Viewport.SouthWest.Lng = coords.Lng
		}
		if coords.Type == "northeast" {
			caseCoords.Viewport.NorthEast.Lat = coords.Lat
			caseCoords.Viewport.NorthEast.Lng = coords.Lng
		}
	

		if i == 3 {
			casesCoords = append(casesCoords, caseCoords)
			caseCoords = entities.ActiveCaseCoords{}
			i = 0
		}
		i++
	}

	return casesCoords, nil
}