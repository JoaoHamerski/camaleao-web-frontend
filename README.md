# frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Docker
Build the image (make sure the .env is present and correct)
```
docker build -t camaleao-front .
```
Create and run container on port 8080
```
docker run --name camaleao-front-container -p 8080:80 -d camaleao-front
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
