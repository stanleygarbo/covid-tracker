package db

import (
	"02_covid_tracker/drive"
	"fmt"
	"log"

	"github.com/go-sql-driver/mysql"
)

func UpdateData() {
	// ---------- download csv

	drive.DownloadCovidCasesAndFacilitiesCSV()

	// -- registering local files in go https://www.programmersought.com/article/27101493129/

	mysql.RegisterLocalFile("./tmp/facilities.csv")
	mysql.RegisterLocalFile("./tmp/covidCases.csv")

	// ----------- connect to db

	db, err := GetDB()
	if err != nil {
		log.Fatalf("Err getting db conn: %v\n", err)
	}
	defer db.Close()

	// ----------- load cases to db

	_, err = db.Query("SHOW TABLES LIKE 'cases';")
	if err != nil {
		log.Fatalf("Err db query: %v\n", err)
	}

	_, err = db.Query("DROP TABLE IF EXISTS cases;")
	if err != nil {
		log.Fatalf("Err db query: %v\n", err)
	}

	fmt.Println("Creating table cases like cases_schema...")

	_, err = db.Query("CREATE TABLE cases LIKE cases_schema;")
	if err != nil {
		log.Fatalf("Err db query: %v\n", err)
	}

	fmt.Println("Loading csv data to table cases...")

	_, err = db.Query(`
		LOAD DATA LOCAL INFILE './tmp/covidCases.csv'
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

	_, err = db.Query("SHOW TABLES LIKE 'facilities';")
	if err != nil {
		log.Fatalf("Err db query: %v\n", err)
	}

	_, err = db.Query("DROP TABLE IF EXISTS facilities;")
	if err != nil {
		log.Fatalf("Err db query: %v\n", err)
	}

	fmt.Println("Creating table facilities like facilities_schema...")

	_, err = db.Query("CREATE TABLE facilities LIKE facilities_schema;")
	if err != nil {
		log.Fatalf("Err db query: %v\n", err)
	}

	fmt.Println("Loading csv data into table facilities...")

	_, err = db.Query(`
		LOAD DATA LOCAL INFILE './tmp/facilities.csv' INTO TABLE facilities FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS
	;`)
	if err != nil {
		log.Fatalf("Err db query: %v\n", err)
	}

	fmt.Println("Done loading csv data into table facilities")
}