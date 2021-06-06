package drive

import (
	"02_covid_tracker/util"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"regexp"
	"strings"

	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/drive/v3"
)

// Retrieve a token, saves the token, then returns the generated client.
func getClient(config *oauth2.Config) *http.Client {
	// The file token.json stores the user's access and refresh tokens, and is
	// created automatically when the authorization flow completes for the first
	// time.
	tokFile := "credentials/token.json"
	tok, err := tokenFromFile(tokFile)
	if err != nil {
		tok = getTokenFromWeb(config)
		saveToken(tokFile, tok)
	}
	return config.Client(context.Background(), tok)
}

// Request a token from the web, then returns the retrieved token.
func getTokenFromWeb(config *oauth2.Config) *oauth2.Token {
	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	fmt.Printf("Go to the following link in your browser then type the authorization code: \n%v\n", authURL)

	var authCode string
	if _, err := fmt.Scan(&authCode); err != nil {
		log.Fatalf("Unable to read authorization code %v", err)
	}

	tok, err := config.Exchange(context.TODO(), authCode)
	if err != nil {
		log.Fatalf("Unable to retrieve token from web %v", err)
	}
	return tok
}

// Retrieves a token from a local file.
func tokenFromFile(file string) (*oauth2.Token, error) {
	f, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	tok := &oauth2.Token{}
	err = json.NewDecoder(f).Decode(tok)
	return tok, err
}

// Saves a token to a file path.
func saveToken(path string, token *oauth2.Token) {
	fmt.Printf("Saving credential file to: %s\n", path)
	f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		log.Fatalf("Unable to cache oauth token: %v", err)
	}
	defer f.Close()
	json.NewEncoder(f).Encode(token)
}

func getService() (*drive.Service, error){
	b, err := ioutil.ReadFile("credentials/gCloudCredentials.json")
	if err != nil {
		return nil, err
	}

	// If modifying these scopes, delete your previously saved token.json.
	config, err := google.ConfigFromJSON(b, drive.DriveReadonlyScope)
	if err != nil {
		return nil, err
	}

	client := getClient(config)

	srv, err := drive.New(client)
	return srv, nil
}

func DownloadFile(fileId string, name string) {
	srv, err := getService()
	if err != nil {
		log.Fatalf("Unable to retrieve Drive client: %v", err)
	}

	r, err := srv.Files.Get(fileId).Download()
	if err != nil {
		fmt.Printf("An error occurred: %v\n", err)
	}
	
	file, err := os.Create("tmp/"+name)
	if err != nil {
		log.Fatalf("Error Creating file: %v", err)
	}
	defer file.Close()
	io.Copy(file, r.Body)

	fmt.Printf("Downloaded %v\n", name)	
}

func DownloadReadMeFirstPDF(){
	fmt.Println("Downloading pdf")

	unShortenedURL, err := util.GetUnshortenedURL("https://bit.ly/DataDropPH")
	if err != nil{
		log.Fatalf("Error unshortening url: %v\n", err)
	}

	fmt.Printf("UnShortened URL: %v\n", unShortenedURL)

	extractedFolderID := strings.Split(strings.Split(unShortenedURL, "/")[5], "?")[0]
	
	srv, err := getService()
	if err != nil {
		log.Fatalf("Unable to retrieve Drive client: %v", err)
	}

	r, err := srv.Files.List().Q(fmt.Sprintf("'%v' in parents", extractedFolderID)).Do()
	if err != nil {
		log.Fatalf("Error listing files: %v", err)
	}

	for _, f := range r.Files{
		DownloadFile(f.Id, "readMeFirst.pdf")
		break
	}
}

func DownloadCovidCasesAndFacilitiesCSV() {
	DownloadReadMeFirstPDF()

	l, err := util.GetDriveLinkFromPDF()
	if err != nil {
		log.Fatalf("Error getting drive link from pdf: %v", err)
	}

	fmt.Printf("drive link: %v\n", l)

	unShortenedURL, err := util.GetUnshortenedURL(l)
	if err != nil{
		log.Fatalf("Error unshortening url: %v\n", err)
	}
	
	fmt.Printf("UnShortened URL: %v\n", unShortenedURL)

	extractedFolderID := strings.Split(strings.Split(unShortenedURL, "/")[5], "?")[0]

	srv, err := getService()
	if err != nil {
		log.Fatalf("Unable to retrieve Drive client: %v", err)
	}

	r, err := srv.Files.List().Q(fmt.Sprintf("'%v' in parents", extractedFolderID)).Do()

	if err != nil{
		log.Fatalf("Unable to list files: %v", err)
	}

	if len(r.Files) < 1 {
		log.Fatalln("There are no files")
	}

	isFacilitiesDownloaded := false
	isCasesDownloaded := false

	for _, v := range r.Files {
		if match, err := regexp.MatchString("DOH COVID Data Drop_ ........ - 05 DOH Data Collect - Daily Report.csv", v.Name); match && !isFacilitiesDownloaded{
			fmt.Printf("Downloading: %v\n", v.Name)	
			DownloadFile(v.Id, "facilities.csv")
			isFacilitiesDownloaded = true

			} else if err != nil{
			log.Fatalf("Error regex: %v\n", err)
		}

		if match, err := regexp.MatchString("DOH COVID Data Drop_ ........ - 04 Case Information.csv", v.Name); match && !isCasesDownloaded{
			fmt.Printf("Downloading: %v\n", v.Name)	
			DownloadFile(v.Id, "covidCases.csv")
			isCasesDownloaded = true

		} else if err != nil{
			log.Fatalf("Error regex: %v\n", err)
		}
	}
}