const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const index = require("./routes/index");
const app = express();

// logic for pushing build files
app.use(index);

const port = process.env.PORT || 8080;

const server = http.createServer(app);
const io = socketIo(server);

// socket.io start
io.on('connection', socket => {
  console.log('Client connected');
  // switches player turn on click
  socket.on('playerClick', currentPlayer => {
    const nextPlayer = currentPlayer === 1 ? 2 : 1;
    socket.broadcast.emit('playerTurn', nextPlayer);
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});
// socket.io end

server.listen(port, () => console.log(`Listening on port ${port}`));
