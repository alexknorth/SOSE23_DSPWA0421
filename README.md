# hello-world

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

To start the json mock server to CRUD data from the server go to 
```
cd <profject-folder>/data
```
and start the server with following call:
```
json-server --watch db.json
```

and start also the websocket server with following call:
```
cd <profject-folder>/data
node ./websockersrever.js
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
