const router = require("express").Router();
const Room = require("../models/Room");

const rooms = [
    new Room("Crypto Discussion Forum", ["Technology"], "ethereumFanGirl"),
    new Room("SpaceX Starlink program", ["Technology", "Space"], "muskIsGod"),
    new Room("DLS in Mordern Cricket", ["Technology", "Sports"], "gradeCricketer"),
    new Room("Bitcoin Miners Organizers", ["Technology"], "bitcoinMiner"),
    new Room("FIFA 2022 winner prediction room", ["Sports"], "messiLover"),
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
