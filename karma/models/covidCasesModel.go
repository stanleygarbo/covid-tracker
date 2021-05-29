package models

import (
	"02_covid_tracker/entities"
	"database/sql"
)

type CovidCasesModel struct {
	DB *sql.DB
}

func (c CovidCasesModel) GetCovidCases(CityMunPSGC string, RegionRes string) ([]entities.CaseReport, error){
	var res *sql.Rows
	var err error

	if CityMunPSGC == "" && RegionRes == "" {
		res, err = c.DB.Query("SELECT HealthStatus, COUNT(*) AS Count FROM cases GROUP BY HealthStatus;")
	} else if CityMunPSGC != "" && RegionRes != "" {
		res, err = c.DB.Query("SELECT HealthStatus, COUNT(*) AS Count FROM cases WHERE CityMuniPSGC = ? AND RegionRes = ? GROUP BY HealthStatus;", CityMunPSGC, RegionRes)
	} else if CityMunPSGC != "" {
		res, err = c.DB.Query("SELECT HealthStatus, COUNT(*) AS Count FROM cases WHERE CityMuniPSGC = ? GROUP BY HealthStatus;", CityMunPSGC)
	}	else if RegionRes != "" {
		res, err = c.DB.Query("SELECT HealthStatus, COUNT(*) AS Count FROM cases WHERE RegionRes = ? GROUP BY HealthStatus;", RegionRes)
	}

	if err != nil {
		return nil, err
	}

	CasesReport := []entities.CaseReport{}

	for res.Next(){
		CaseReport := entities.CaseReport{}
		err := res.Scan(&CaseReport.HealthStatus, &CaseReport.Count)
		if err != nil{
			return nil, err
		}
		CasesReport = append(CasesReport, CaseReport)
	}
	res.Close()

	return CasesReport, nil
}

func (c CovidCasesModel) GetCasesChartData(CityMunPSGC string, RegionRes string) ([]entities.DayReport ,error){
	var res *sql.Rows
	var err error

	if CityMunPSGC == "" && RegionRes == "" {
		res, err = c.DB.Query("SELECT DateRepConf AS Date, COUNT(*) AS Count FROM cases GROUP BY DateRepConf ORDER BY DateRepConf ASC;")
	} else if CityMunPSGC != "" && RegionRes != "" {
		res, err = c.DB.Query("SELECT DateRepConf AS Date, COUNT(*) AS Count FROM cases WHERE CityMuniPSGC = ? AND RegionRes = ? GROUP BY DateRepConf ORDER BY DateRepConf ASC;", CityMunPSGC, RegionRes)
	} else if CityMunPSGC != "" {
		res, err = c.DB.Query("SELECT DateRepConf AS Date, COUNT(*) AS Count FROM cases WHERE CityMuniPSGC = ? GROUP BY DateRepConf ORDER BY DateRepConf ASC;", CityMunPSGC)
	}	else if RegionRes != "" {
		res, err = c.DB.Query("SELECT DateRepConf AS Date, COUNT(*) AS Count FROM cases WHERE RegionRes = ? GROUP BY DateRepConf ORDER BY DateRepConf ASC;", RegionRes)
	}

	if err != nil {
		return nil, err
	}

	ChartData := []entities.DayReport{}

	for res.Next(){
		DayReport := entities.DayReport{}
		err := res.Scan(&DayReport.Date, &DayReport.Count)
		if err != nil{
			return nil, err
		}
		ChartData = append(ChartData, DayReport)
	}
	res.Close()

	return ChartData, nil
}

func (c CovidCasesModel) GetRecoveriesChartData(CityMunPSGC string, RegionRes string) ([]entities.DayReport ,error){
	var res *sql.Rows
	var err error

	if CityMunPSGC == "" && RegionRes == "" {
		res, err = c.DB.Query("SELECT DateRecover AS Date, COUNT(*) AS Count FROM cases WHERE HealthStatus = 'RECOVERED' GROUP BY DateRecover ORDER BY DateRecover ASC;")
	} else if CityMunPSGC != "" && RegionRes != "" {
		res, err = c.DB.Query("SELECT DateRecover AS Date, COUNT(*) AS Count FROM cases WHERE HealthStatus = 'RECOVERED' AND CityMuniPSGC = ? AND RegionRes = ? GROUP BY DateRecover ORDER BY DateRecover ASC;", CityMunPSGC, RegionRes)
	} else if CityMunPSGC != "" {
		res, err = c.DB.Query("SELECT DateRecover AS Date, COUNT(*) AS Count FROM cases WHERE HealthStatus = 'RECOVERED' AND CityMuniPSGC = ? GROUP BY DateRecover ORDER BY DateRecover ASC;", CityMunPSGC)
	}	else if RegionRes != "" {
		res, err = c.DB.Query("SELECT DateRecover AS Date, COUNT(*) AS Count FROM cases WHERE HealthStatus = 'RECOVERED' AND RegionRes = ? GROUP BY DateRecover ORDER BY DateRecover ASC;", RegionRes)
	}

	if err != nil {
		return nil, err
	}

	ChartData := []entities.DayReport{}

	for res.Next(){
		DayReport := entities.DayReport{}
		err := res.Scan(&DayReport.Date, &DayReport.Count)
		if err != nil{
			return nil, err
		}
		ChartData = append(ChartData, DayReport)
	}
	res.Close()

	return ChartData, nil
}

func (c CovidCasesModel) GetDeathsChartData(CityMunPSGC string, RegionRes string) ([]entities.DayReport ,error){
	var res *sql.Rows
	var err error

	if CityMunPSGC == "" && RegionRes == "" {
		res, err = c.DB.Query("SELECT DateDied AS Date, COUNT(*) AS Count FROM cases WHERE HealthStatus = 'DIED' GROUP BY DateDied ORDER BY DateDied ASC;")
	} else if CityMunPSGC != "" && RegionRes != "" {
		res, err = c.DB.Query("SELECT DateDied AS Date, COUNT(*) AS Count FROM cases WHERE HealthStatus = 'DIED' AND CityMuniPSGC = ? AND RegionRes = ? GROUP BY DateDied ORDER BY DateDied ASC;", CityMunPSGC, RegionRes)
	} else if CityMunPSGC != "" {
		res, err = c.DB.Query("SELECT DateDied AS Date, COUNT(*) AS Count FROM cases WHERE HealthStatus = 'DIED' AND CityMuniPSGC = ? GROUP BY DateDied ORDER BY DateDied ASC;", CityMunPSGC)
	}	else if RegionRes != "" {
		res, err = c.DB.Query("SELECT DateDied AS Date, COUNT(*) AS Count FROM cases WHERE HealthStatus = 'DIED' AND RegionRes = ? GROUP BY DateDied ORDER BY DateDied ASC;", RegionRes)
	}

	if err != nil {
		return nil, err
	}

	ChartData := []entities.DayReport{}

	for res.Next(){
		DayReport := entities.DayReport{}
		err := res.Scan(&DayReport.Date, &DayReport.Count)
		if err != nil{
			return nil, err
		}
		ChartData = append(ChartData, DayReport)
	}
	res.Close()

	return ChartData, nil
}