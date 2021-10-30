const express = require("express");
const app = express();
const http = require('http')
const server = http.Server(app)
const socketio = require('socket.io')
const fetch = require("node-fetch")
const PORT = process.env.PORT || 3000;

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.set('view engine', 'ejs');
var link='join room';
// var rooms=[{id:'1',name: 'Crypocurrency Discussion forum', admin: 'ethereumFanBoi', tags: ['Technology']},
// {id:'2',name: 'SpaceX Starlink program', admin: 'muskIsGod', tags: ['Technology','Space']},
// {id:'3',name: 'PS5 Spaceship Games', admin: 'playStationLover', tags: ['Technology','Sports','Space']},
// {id:'4',name: 'Crypocurrency Discussion forum', admin: 'ethereumFanBoi', tags: ['Technology']},
// {id:'5',name: 'Crypocurrency Discussion forum', admin: 'ethereumFanBoi', tags: ['Technology']},
// {id:'6',name: 'Crypocurrency Discussion forum', admin: 'ethereumFanBoi', tags: ['Technology']},
// {id:'7',name: 'Crypocurrency Discussion forum', admin: 'ethereumFanBoi', tags: ['Technology']}];
let rooms
fetch("http://localhost:3001/rooms")
  .then(res => res.json())
  .then(res => rooms = [...res.rooms])
  .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/terms', (req, res) => {
    res.render('terms');
})
app.get('/developers', (req, res) => {
    res.render('developers');
})
app.get('/discover-rooms', (req, res) => {
    res.render('discover',{rooms: rooms,link:link});
})
app.get('/rooms/', (req, res) => {
  
    // Websockets using socket.io
    const io = socketio(server)
    let participants = ['neutr0n Star', 'ayush Daga', 'NerdyVisky', 'ethereumFanGirl']
    res.render('rooms', {participants: participants});
})

app.post("/discover-rooms", (req, res) => {
  console.log(req.body)
  var name = req.body.name;
  const sports = req.body.Sports;
  const tech = req.body.Technology;
  const space = req.body.Space;
  const movies = req.body.Movies;
  const books = req.body.Books;
  const games = req.body.Games;
  const sports1 = req.body.Sports;
  const tech1 = req.body.Technology;
  const space1 = req.body.Space;
  const movies1 = req.body.Movies;
  const books1 = req.body.Books;
  const games1 = req.body.Games;
  const topic = req.body.topic;
  if (topic === "") {
    res.redirect("/discover-rooms"); //these are temporary for now
  } else {
    let createdBy = req.body.name
    let topic = req.body.topic
    let tags = [...Object.keys(req.body)]
    tags = tags.filter(t => t !== 'topic')
    tags = tags.filter(t => t !== 'name')
    const data = {name: topic, tags, createdBy}
    fetch("http://localhost:3001/rooms/createRoom", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(res => console.log(res))
    res.redirect("/discover-rooms"); //these are temporary for now
  }
});

app.use((req, res) => {
  res.status(404).render("404");
});

server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
