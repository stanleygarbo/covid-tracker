package entities

import "time"

type CaseReport struct {
	HealthStatus string
	Count        uint
}

type DayReport struct {
	Date  string
	Count uint
}

type CovidCase struct {
	CaseCode    string
	DateRepConf time.Time
	Sex         string
}

type CovidCases struct {
	CasesReport         []CaseReport
	CasesChartData      []DayReport
	RecoveriesChartData []DayReport
	DeathsChartData     []DayReport
}