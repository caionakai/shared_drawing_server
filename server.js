var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var cors = require("cors");

app.use(cors());

io.on("connection", (socket) => {
  socket.on("start_draw", ({ offsetX, offsetY }) => {
    socket.broadcast.emit("start_draw", { offsetX, offsetY });
  });

  socket.on("finish_draw", () => {
    socket.broadcast.emit("finish_draw");
  });

  socket.on("draw", ({ offsetX, offsetY }) => {
    socket.broadcast.emit("draw", { offsetX, offsetY });
  });

  socket.on("clear", () => {
    socket.broadcast.emit("clear");
  });
});

http.listen(process.env.PORT || 3001, () => {
  console.log("listening on *:3001");
});
