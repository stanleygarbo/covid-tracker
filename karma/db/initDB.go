package db

import (
	"log"

	"github.com/go-sql-driver/mysql"
)

func InitDB() {
	db, err = GetDB()
	if err != nil {
		log.Fatalf("Error getting db: %v \n", err)
	}

	_, err = db.Query(`
		CREATE TABLE IF NOT EXISTS facilities_schema(
			hfhudcode varchar(255),
			id varchar(255),
			cfname varchar(255),
			updateddate varchar(255),
			addeddate varchar(255),
			reportdate varchar(255),
			icu_v varchar(255),
			icu_o varchar(255),
			isolbed_v varchar(255),
			isolbed_o varchar(255),
			beds_ward_v varchar(255),
			beds_ward_o varchar(255),
			mechvent_v varchar(255),
			mechvent_o varchar(255),
			icu_v_nc varchar(255),
			icu_o_nc varchar(255),
			nonicu_v_nc varchar(255),
			nonicu_o_nc varchar(255),
			mechvent_v_nc varchar(255),
			mechvent_o_nc varchar(255),
			qnurse varchar(255),
			qdoctor varchar(255),
			qother varchar(255),
			nurse_adm varchar(255),
			doctor_adm varchar(255),
			other_adm varchar(255),
			susp_asym varchar(255),
			susp_mild varchar(255),
			susp_severe varchar(255),
			susp_crit varchar(255),
			susp_died varchar(255),
			susp_mod varchar(255),
			prob_asym varchar(255),
			prob_mild varchar(255),
			prob_severe varchar(255),
			prob_crit varchar(255),
			prob_died varchar(255),
			prob_mod varchar(255),
			conf_asym varchar(255),
			conf_mild varchar(255),
			conf_severe varchar(255),
			conf_crit varchar(255),
			conf_died varchar(255),
			conf_mod varchar(255),
			tpatient_adm varchar(255),
			tpatient_er varchar(255),
			tpatient_icu varchar(255),
			trans_ttmf varchar(255),
			discharged varchar(255),
			region varchar(255),
			region_psgc varchar(255),
			province_psgc varchar(255),
			city_mun_psgc varchar(255),
			province varchar(255),
			city_mun varchar(255),
			north_coord varchar(255),
			east_coord varchar(255)
		);
	`)
	if err != nil {
		log.Fatalf("Error creating facilities_schema table: %v \n", err)
	}
	
	_, err = db.Query(`
		CREATE TABLE IF NOT EXISTS cases_schema(
			CaseCode varchar(100), 
			Age varchar(255), 
			AgeGroup varchar(255), 
			Sex varchar(255), 
			DateSpecimen varchar(255), 
			DateResultRelease varchar(255), 
			DateRepConf varchar(255), 
			DateDied varchar(255), 
			DateRecover varchar(255), 
			RemovalType varchar(255), 
			Admitted varchar(255), 
			RegionRes varchar(255),
			ProvRes varchar(255), 
			CityMunRes varchar(255), 
			CityMuniPSGC varchar(255), 
			BarangayRes varchar(255), 
			BarangayPSGC varchar(255), 
			HealthStatus varchar(255), 
			Quarantined varchar(255), 
			DateOnset varchar(255), 
			Pregnanttab varchar(255), 
			ValidationStatus varchar(955)
		);
	`)
	if err != nil {
		log.Fatalf("Error creating cases_schema table: %v \n", err)
	}

	_, err = db.Query(`
		DROP TABLE IF EXISTS coords;
	`)

	_, err = db.Query(`
		CREATE TABLE IF NOT EXISTS coords(
			id VARCHAR(255),
			type VARCHAR(255),
			isSinglePoint VARCHAR(50),
			lat VARCHAR(255),
			lng VARCHAR(255)
		);
	`)
	if err != nil {
		log.Fatalf("Error creating coords table: %v \n", err)
	}

	mysql.RegisterLocalFile("./tmp/coords.csv")

	_, err = db.Query(`
		LOAD DATA LOCAL INFILE './tmp/coords.csv' 
		INTO TABLE coords 
		FIELDS TERMINATED BY ';' 
		ENCLOSED BY '"'
		LINES TERMINATED BY '\n'
	`)
	if err != nil {
		log.Fatalf("Error creating coords table: %v \n", err)
	}
}