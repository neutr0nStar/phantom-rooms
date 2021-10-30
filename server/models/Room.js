const { v4: uuidv4 } = require("uuid");

class Room {
    constructor(name, tags, createdBy) {
        this.name = name;
        this.tags = tags.sort();
        this.createdBy = createdBy;
        this.id = uuidv4();
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    removeUser(user) {
        this.users = this.users.filter((u) => u !== user);
    }
}

module.exports = Room;
