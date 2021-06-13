import React, { Component } from "react";
import {
  Map as GoogleMap,
  GoogleApiWrapper,
  Rectangle,
} from "google-maps-react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const LoaderWrapper = styled.div`
  height: 100vh;
  width: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background: rgba(0, 0, 0, 0.5);

  z-index: 4;

  display: grid;
  place-items: center;
`;

const center = {
  lat: 11.09586,
  lng: 124.5532,
};

export class Map extends Component {
  state = {
    zoom: 11,
  };

  render() {
    console.log(this.props.google);
    return (
      <Container>
        {this.props.isLoading && (
          <LoaderWrapper>
            <CircularProgress />
          </LoaderWrapper>
        )}
        {}
        <GoogleMap
          google={this.props.google}
          style={containerStyle}
          fullscreenControl={false}
          disableDefaultUI={false}
          streetViewControl={false}
          zoomControl={false}
          mapTypeControl={true}
          initialCenter={center}
          zoom={11}
          gestureHandling={"greedy"}
          disableDoubleClickZoom={true}
          minZoom={1}
          maxZoom={20}
          onLoad={() => console.log("is loaded")}
        >
          {/* {this.props.coords &&
            this.props.coords.map((i, idx) => {
              const img = {
                url: "https://igcs.org/wp-content/uploads/2020/04/shutterstock_1674349438-Converted-COVID-Red-sq-icon.jpg",
                size: 20,
              };
              return (
                <Marker
                  key={idx}
                  position={{ lat: i.location.lat, lng: i.location.lng }}
                  image={img}
                ></Marker>
              );
            })} */}

          {this.props.coords &&
            this.props.coords.map((i, idx) => {
              const PAR = {
                northeast: {
                  lat: 21.2412572,
                  lng: 127.6444784,
                },
                southwest: {
                  lat: 4.2259,
                  lng: 116.1474999,
                },
              };
              if (
                i.viewport.northeast.lng - i.viewport.southwest.lng <
                  0.1380000000000001 &&
                i.viewport.northeast.lng - i.viewport.southwest.lng > 0 &&
                i.viewport.northeast.lat - i.viewport.southwest.lat <
                  0.1380000000000001 &&
                i.viewport.northeast.lat - i.viewport.southwest.lat > 0
              ) {
                if (
                  i.viewport.northeast.lat > PAR.southwest.lat &&
                  i.viewport.northeast.lat < PAR.northeast.lat &&
                  i.viewport.northeast.lng > PAR.southwest.lng &&
                  i.viewport.northeast.lng < PAR.northeast.lng &&
                  i.viewport.southwest.lat > PAR.southwest.lat &&
                  i.viewport.southwest.lat < PAR.northeast.lat &&
                  i.viewport.southwest.lng > PAR.southwest.lng &&
                  i.viewport.southwest.lng < PAR.northeast.lng
                ) {
                  return (
                    <Rectangle
                      key={idx}
                      bounds={{
                        north: i.viewport.northeast.lat,
                        east: i.viewport.northeast.lng,
                        south: i.viewport.southwest.lat,
                        west: i.viewport.southwest.lng,
                      }}
                      options={{
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.2,
                        strokeWeight: 2,
                        fillColor: "#FF0000",
                        fillOpacity: 0.07,
                      }}
                    ></Rectangle>
                  );
                } else {
                  return null;
                }
              }
            })}
        </GoogleMap>
      </Container>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY,
})(Map);
