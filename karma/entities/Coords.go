package entities

type CoordsInfo struct {
	Id   string  `json:"id"`
	Type string  `json:"type"`
	Lat  float64 `json:"lat"`
	Lng  float64 `json:"lng"`
}

type Coords struct {
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`
}

type Viewport struct {
	SouthWest Coords `json:"southwest"`
	NorthEast Coords `json:"northeast"`
}

type CoordsTypes struct {
	// Location Coords   `json:"location"`
	Viewport Viewport `json:"viewport"`
}

type ActiveCaseCoords struct {
	PSGC     string   `json:"psgc"`
	Viewport Viewport `json:"viewport"`
	// Location Coords `json:"location"`
}