const http = require('http');
const app = require('./app');

app.set("port", process.env.PORT || 5000);

const server = http.createServer(app);

server.listen(app.get("port"), function () {
    console.log("Server is running on port ", app.get("port"));
});