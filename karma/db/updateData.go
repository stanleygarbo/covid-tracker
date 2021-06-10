package db

import (
	"02_covid_tracker/drive"
	"database/sql"
	"fmt"
	"log"
	"os/exec"
)

func UpdateData() {
	var res *sql.Rows

	// ---------- download csv

	drive.DownloadCovidCasesAndFacilitiesCSV()

	// ---------- Copy downloaded CSVs to docker container

	fmt.Println("Copying csv files to docker container...")

	cmd := exec.Command("docker", "cp", "tmp/covidCases.csv", "karma_mysql_1:/tmp/")

	err = cmd.Run()
	if err != nil {
		log.Fatalf("Error executing command: %v\n", err)
	}

	cmd2 := exec.Command("docker", "cp", "tmp/facilities.csv", "karma_mysql_1:/tmp/")

	err = cmd2.Run()
	if err != nil {
		log.Fatalf("Error executing command: %v\n", err)
	}

	fmt.Println("Done copying csv files to docker container")

	// ----------- connect to db

	db, err := GetDB()
	if err != nil {
		log.Fatalf("Err getting db conn: %v\n", err)
	}
	defer db.Close()

	// ----------- load cases to db

	res, err = db.Query("SHOW TABLES LIKE 'cases';")
	if err != nil {
		log.Fatalf("Err db query: %v\n", err)
	}

	if res.Next(){
		fmt.Println("Dropping table cases...")
	
		_, err = db.Query("DROP TABLE cases;")
		if err != nil {
			log.Fatalf("Err db query: %v\n", err)
		}
	} 

	fmt.Println("Creating table cases like cases_schema...")

	_, err = db.Query("CREATE TABLE cases LIKE cases_schema;")
	if err != nil {
		log.Fatalf("Err db query: %v\n", err)
	}

	fmt.Println("Loading csv data to table cases...")

	_, err = db.Query(`
		LOAD DATA INFILE '/tmp/covidCases.csv'
		INTO TABLE cases
		FIELDS TERMINATED BY ',' ENCLOSED BY '"'
		LINES TERMINATED BY '\n'
		IGNORE 1 ROWS
	;`)
	if err != nil {
		log.Fatalf("Err db query: %v\n", err)
	}

	fmt.Println("Done Loading csv data to table cases")

	// ------------------ load facilities to db

	res, err = db.Query("SHOW TABLES LIKE 'facilities';")
	if err != nil {
		log.Fatalf("Err db query: %v\n", err)
	}

	if res.Next(){
		fmt.Println("Dropping table facilities...")

		_, err = db.Query("DROP TABLE facilities;")
		if err != nil {
			log.Fatalf("Err db query: %v\n", err)
		}
	} 

	fmt.Println("Creating table facilities like facilities_schema...")

	_, err = db.Query("CREATE TABLE facilities LIKE facilities_schema;")
	if err != nil {
		log.Fatalf("Err db query: %v\n", err)
	}

	fmt.Println("Loading csv data into table facilities...")

	_, err = db.Query(`
		LOAD DATA INFILE '/tmp/facilities.csv' INTO TABLE facilities FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS
	;`)
	if err != nil {
		log.Fatalf("Err db query: %v\n", err)
	}

	fmt.Println("Done loading csv data into table facilities")

}