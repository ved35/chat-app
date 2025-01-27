const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const socketServer = require('./socketServer');

const app = require('./app')

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || process.env.API_PORT;

const server = http.createServer(app);
socketServer.registerSocketServer(server);

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB connection sucessfull");

    server.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`)
    })
}).catch((err) => {
    console.log("database connection fail. Server not started");
    console.log(err);
})
