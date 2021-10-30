const router = require("express").Router();
const Room = require("../models/Room");

const rooms = [
    new Room("Room 1", ["Technology", "Space"], "ye boi"),
    new Room("Room 2", ["Technology", "Space"], "ye boi"),
    new Room("Room 3", ["Technology"], "yo boi")
];

router.get("/", (req, res) => {
    res.send({ rooms: rooms });
});

router.post("/createRoom", (req, res) => {
    console.log(req.body)
    try {
        const newRoom = new Room(req.body.name, req.body.tags, req.body.createdBy);
        if (rooms.find((r) => r === newRoom) !== undefined) {
            // Room already exists
            res.status(400).send("Room already exists");
        } else {
            rooms.push(newRoom);
            res.status(200).send("New room created successfully");
        }
    } catch (e) {
        console.log(e);
        res.status(400).send("Cannot create room with given data.");
    }
});

router.post("/getRooms", (req, res) => {
    try {
        var searchTags = req.body.tags;
        searchTags.sort();
        const matchingRooms = rooms.filter(
            (r) => JSON.stringify(r.tags) === JSON.stringify(searchTags)
        );
        res.status(200).send({ rooms: matchingRooms });
    } catch (e) {
        console.error(e);
        res.status(400).send("Some error occurred finding rooms.");
    }
});

module.exports = router;
