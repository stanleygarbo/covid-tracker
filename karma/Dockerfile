FROM golang:latest

LABEL maintainer="Stanley Garbo<stanleygarbo@gmail.com>"

WORKDIR /app

COPY go.mod .

COPY go.sum .

RUN go mod download

COPY . .

RUN go build

CMD ["./02_covid_tracker"]