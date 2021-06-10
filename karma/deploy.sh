echo "docker-compose build running..."

docker-compose build

echo "docker-compose up running..."

docker-compose up

echo "Running executable"

./02_covid_tracker

echo "done"
