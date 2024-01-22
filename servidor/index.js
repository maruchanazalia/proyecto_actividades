const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();
// Creación del servidor
const PORT = process.env.PORT;
const PING_INTERVAL = 1000;
const PING_TIMEOUT = 2000;

const server = http.createServer(app);
const io = socketIO(server, {
    cors: true,
    pingInterval: PING_INTERVAL,
    pingTimeout: PING_TIMEOUT
});

// Middlewares globales de express
app.use(cors());
app.use(express.json());

// Configuración de rutas HTTP
//const routes = require('./src/routes');
//app.use(routes);

server.listen(PORT, () => {
    console.log(`Servidor escuchando desde mi cuarto en el puerto ${PORT}!`);
});

app.use(express.static(path.join(__dirname, 'public')));

//websockets
io.on('connection', (socket) => {
    console.log('nueva conexión', socket.id);

    socket.on('tareas:lista', (data) => {
        io.emit('tareas:lista', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
    

});




