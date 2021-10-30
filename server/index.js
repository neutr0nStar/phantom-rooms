const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const io = require("socket.io")(PORT + 1, { cors: { origin: "*" } });

app.use(express.json());

////////// Express routes //////////
app.get("/", (req, res) => {
    res.send("It's working!");
});

const roomRoute = require("./routes/Room");
app.use("/rooms", roomRoute);

////////// Websockets using socket.io //////////
io.on("connection", (socket) => {

    // User joins room
    socket.on('joinedRoom', ({user, roomName}) => {
        // console.log(user, roomName);
        socket.join(roomName)
        io.to(roomName).emit('message', {
            message: `${user} joined the room.`,
            user: user,
            sendTime: new Date().toLocaleTimeString().substring(0, 5)
        })
    })

    // BroadCast new message
    socket.on('newMessage', ({message, user, sendTime, roomName}) => {
        socket.to(roomName).emit('message', {message, user, sendTime})
    })

});

////////// Start server //////////
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});
