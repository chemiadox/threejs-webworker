# threejs-webworker
Experimental web worker with three.js and offscreen canvas
Surely doesn't work in Safari and on iOS

## Install
- For local runs `docker/docker-compose` should be installed
- Node should be installed
```bash
npm install
```

## Run
```bash
# build source for development
npm run build:dev
# or for production
npm run build:prov
# start apache container for local access
docker-compose up apache
# or for detached mode
docker-compose up -d apache
```
Then the application might be accessed from the browser by visiting `http://localhost:8080`