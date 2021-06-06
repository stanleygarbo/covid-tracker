package util

import (
	"bytes"
	"log"
	"regexp"
	"strings"

	"github.com/ledongthuc/pdf"
)

func GetDriveLinkFromPDF() (string, error) {
	regex := "https://bit.ly/([A-Za-z0-9]+)"
	// expected https://bit.ly/3igBVERLink
	r, err := regexp.Compile(regex)
	if err != nil {
		log.Fatalf("Error compiling regex: %v\n", err)
	}

	content, err := readPdf("tmp/readMeFirst.pdf") // Read local pdf file
	if err != nil {
		return "", err
	}

	// Remove "Link" https://bit.ly/3igBVERLink [3igBVER] is dynamic
	return strings.Replace(r.FindString(content), "Link", "" , 1), nil
}

func readPdf(path string) (string, error) {
	f, r, err := pdf.Open(path)
	// remember close file
	defer f.Close()
	if err != nil {
		return "", err
	}
	var buf bytes.Buffer
	b, err := r.GetPlainText()
	if err != nil {
		return "", err
	}
	buf.ReadFrom(b)
	return buf.String(), nil
}