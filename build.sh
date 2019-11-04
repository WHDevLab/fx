docker stop fx
docker rm fx
docker rmi fx
docker build -t fx .
docker run --name fx -dt -p 1378:1378 fx
