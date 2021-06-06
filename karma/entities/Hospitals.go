package entities

type Hospital struct {
	Hfhudcode     string // code based on NHFR
	Id            string
	Cfname        string // facility name
	Updateddate   string
	Addeddate     string
	Reportdate    string
	Icu_v         string // Total number of ICU beds with or without negative pressure in your facility that are currently vacant and available for use by suspect, probable, or confirmed COVID-19 patients
	Icu_o         string // Total number of ICU beds with or without negative pressure in your facility that are currently occupied by suspect, probable, or confirmed COVID-19 patients
	Isolbed_v     string // Total number of isolation beds and converted/makeshift isolation beds based on DOH standardsin your facility that are currently occupied by suspect, probable, or confirmed COVID-19 patients
	Isolbed_o     string // Total number of isolation beds and converted/makeshift isolation beds based on DOH standards in your facility that are currently vacant and available for use.
	Beds_ward_v   string
	Beds_ward_o   string
	Mechvent_v    string
	Mechvent_o    string
	Icu_v_nc      string // Total number of ICU beds with or without negative pressure in your facility that are currently vacant and available for use by Non-COVID-19 patients
	Icu_o_nc      string // Total number of ICU beds with or without negative pressure in your facility that are currently occupied by Non-COVID-19 patients
	Nonicu_v_nc   string // Total number of non-ICU beds (including wards and isolation beds and all other non-ICU beds) dedicated for Non-COVID-19 cases in your facility that are currently vacant and available for use
	Nonicu_o_nc   string // Total number of non-ICU beds (including wards and isolation beds and all other non-ICU beds) dedicated for Non-COVID-19 cases in your facility that are currently occupied
	Mechvent_v_nc string
	Mechvent_o_nc string
	Qnurse        string
	Qdoctor       string
	Qother        string
	Nurse_adm     string
	Doctor_adm    string
	Other_adm     string
	Susp_asym     string
	Susp_mild     string
	Susp_mod      string
	Susp_severe   string
	Susp_crit     string
	Susp_died     string
	Prob_asym     string
	Prob_mild     string
	Prob_mod      string
	Prob_severe   string
	Prob_crit     string
	Prob_died     string
	Conf_asym     string
	Conf_mild     string
	Conf_mod      string
	Conf_severe   string
	Conf_crit     string
	Conf_died     string
	Tpatient_adm  string
	Tpatient_er   string
	Tpatient_icu  string
	Trans_ttmf    string
	Discharged    string
	Region        string
	Region_psgc   string
	Province      string
	Province_psgc string
	City_mun      string
	City_mun_psgc string
	North_coord   string
	East_coord    string
}

type HospitalList struct {
	Hfhudcode     string // code based on NHFR
	Cfname        string // facility name
	Reportdate    string
	Icu_v         string // Total number of ICU beds available for use by suspect, probable, or confirmed COVID-19 patients
	Icu_o         string // Total number of ICU beds that are currently occupied by suspect, probable, or confirmed COVID-19 patients
	Isolbed_v     string // Total number of isolation beds that are currently occupied by suspect, probable, or confirmed COVID-19 patients
	Isolbed_o     string // Total number of isolation beds are currently vacant and available for use.
	Icu_v_nc      string // Total number of ICU beds that are currently vacant and available for use by Non-COVID-19 patients
	Icu_o_nc      string // Total number of ICU beds that are currently occupied by Non-COVID-19 patients
	Nonicu_v_nc   string // Total number of non-ICU beds dedicated for Non-COVID-19 cases in your facility that are currently vacant and available for use
	Nonicu_o_nc   string // Total number of non-ICU beds dedicated for Non-COVID-19 cases in your facility that are currently occupied
	Region_psgc   string
	City_mun_psgc string
}

type Hospitals []HospitalList