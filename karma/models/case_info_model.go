package models

type Case struct {
	CaseCode          string
	Age               uint
	AgeGroup          string
	Sex               string
	DateSpecimen      string
	DateResultRelease string
	DateRepConf       string
	DateDied          string
	DateRecover       string
	RemovalType       string
	Admitted          string
	RegionRes         string
	ProvRes           string
	CityMunRes        string
	CityMuniPSGC      string
	BarangayRes       string
	BarangayPSGC      string
	HealthStatus      string
	Quarantined       string
	DateOnset         string
	Pregnanttab       string
	ValidationStatus  string
}