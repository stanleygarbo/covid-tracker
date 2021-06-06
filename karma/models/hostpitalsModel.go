package models

import (
	"02_covid_tracker/entities"
	"database/sql"
)

type HospitalsModel struct {
	DB *sql.DB
}

var err error

func (h HospitalsModel) GetHospital(hfhudcode string) (entities.Hospital, error){
	var res *sql.Row
	var err error

	res = h.DB.QueryRow("SELECT * FROM facilities f1 WHERE f1.reportdate IN (SELECT MAX(f2.reportdate) FROM facilities f2) AND f1.hfhudcode = ?;", hfhudcode)
	
	Hospital := entities.Hospital{}

	err = res.Scan(
		&Hospital.Hfhudcode,
		&Hospital.Id,
		&Hospital.Cfname,
		&Hospital.Updateddate,
		&Hospital.Addeddate,
		&Hospital.Reportdate,
		&Hospital.Icu_v,
		&Hospital.Icu_o,
		&Hospital.Isolbed_v,
		&Hospital.Isolbed_o,
		&Hospital.Beds_ward_v,
		&Hospital.Beds_ward_o,
		&Hospital.Mechvent_v,
		&Hospital.Mechvent_o,
		&Hospital.Icu_v_nc,
		&Hospital.Icu_o_nc,
		&Hospital.Nonicu_v_nc,
		&Hospital.Nonicu_o_nc,
		&Hospital.Mechvent_v_nc,
		&Hospital.Mechvent_o_nc,
		&Hospital.Qnurse,
		&Hospital.Qdoctor,
		&Hospital.Qother,
		&Hospital.Nurse_adm,
		&Hospital.Doctor_adm,
		&Hospital.Other_adm,
		&Hospital.Susp_asym,
		&Hospital.Susp_mild,
		&Hospital.Susp_severe,
		&Hospital.Susp_crit,
		&Hospital.Susp_died,
		&Hospital.Susp_mod,
		&Hospital.Prob_asym,
		&Hospital.Prob_mild,
		&Hospital.Prob_severe, 
		&Hospital.Prob_crit,   
		&Hospital.Prob_died,    
		&Hospital.Prob_mod,
		&Hospital.Conf_asym,     
		&Hospital.Conf_mild,    
		&Hospital.Conf_severe,   
		&Hospital.Conf_crit,     
		&Hospital.Conf_died,     
		&Hospital.Conf_mod,    
		&Hospital.Tpatient_adm, 
		&Hospital.Tpatient_er,   
		&Hospital.Tpatient_icu,  
		&Hospital.Trans_ttmf,  
		&Hospital.Discharged,    
		&Hospital.Region,        
		&Hospital.Region_psgc,   
		&Hospital.Province_psgc, 
		&Hospital.City_mun_psgc, 
		&Hospital.Province,      
		&Hospital.City_mun,      
		&Hospital.North_coord,   
		&Hospital.East_coord,    
	)
	if err != nil{
		return entities.Hospital{}, err
	}

	return Hospital, nil
}

func (h HospitalsModel) GetHospitals() ([]entities.Hospital, error){
	var res *sql.Rows
	var err error
	res, err = h.DB.Query("SELECT * FROM facilities f1 WHERE f1.reportdate IN (SELECT MAX(f2.reportdate) FROM facilities f2);")

	if err != nil{
		return nil, err
	}

	Hospitals := []entities.Hospital{}

	for res.Next() {
		Hospital := entities.Hospital{}
		err := res.Scan(
			&Hospital.Hfhudcode,
			&Hospital.Id,
			&Hospital.Cfname,
			&Hospital.Updateddate,
			&Hospital.Addeddate,
			&Hospital.Reportdate,
			&Hospital.Icu_v,
			&Hospital.Icu_o,
			&Hospital.Isolbed_v,
			&Hospital.Isolbed_o,
			&Hospital.Beds_ward_v,
			&Hospital.Beds_ward_o,
			&Hospital.Mechvent_v,
			&Hospital.Mechvent_o,
			&Hospital.Icu_v_nc,
			&Hospital.Icu_o_nc,
			&Hospital.Nonicu_v_nc,
			&Hospital.Nonicu_o_nc,
			&Hospital.Mechvent_v_nc,
			&Hospital.Mechvent_o_nc,
			&Hospital.Qnurse,
			&Hospital.Qdoctor,
			&Hospital.Qother,
			&Hospital.Nurse_adm,
			&Hospital.Doctor_adm,
			&Hospital.Other_adm,
			&Hospital.Susp_asym,
			&Hospital.Susp_mild,
			&Hospital.Susp_severe,
			&Hospital.Susp_crit,
			&Hospital.Susp_died,
			&Hospital.Susp_mod,
			&Hospital.Prob_asym,
			&Hospital.Prob_mild,
			&Hospital.Prob_severe, 
			&Hospital.Prob_crit,   
			&Hospital.Prob_died,    
			&Hospital.Prob_mod,
			&Hospital.Conf_asym,     
			&Hospital.Conf_mild,    
			&Hospital.Conf_severe,   
			&Hospital.Conf_crit,     
			&Hospital.Conf_died,     
			&Hospital.Conf_mod,    
			&Hospital.Tpatient_adm, 
			&Hospital.Tpatient_er,   
			&Hospital.Tpatient_icu,  
			&Hospital.Trans_ttmf,  
			&Hospital.Discharged,    
			&Hospital.Region,        
			&Hospital.Region_psgc,   
			&Hospital.Province_psgc, 
			&Hospital.City_mun_psgc, 
			&Hospital.Province,      
			&Hospital.City_mun,      
			&Hospital.North_coord,   
			&Hospital.East_coord,    
		)
		if err != nil{
			return nil, err
		}
		Hospitals = append(Hospitals, Hospital)
	}

	return Hospitals, nil
}