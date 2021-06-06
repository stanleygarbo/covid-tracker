package util

import (
	"fmt"
	"net/http"
)

func GetUnshortenedURL(shortenedURL string) (string, error) {
	client := &http.Client{
    CheckRedirect: func(req *http.Request, via []*http.Request) error {
      return http.ErrUseLastResponse
	}}

	res, err := client.Get(shortenedURL)
	if err != nil{
		return "", err
	}
	defer res.Body.Close()
	if err != nil{
		return "", err
	}

	fmt.Println(res.Header.Values("location")[0])
	
	return res.Header.Values("location")[0], nil
}