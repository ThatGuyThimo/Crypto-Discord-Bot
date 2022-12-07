const Event = require("../Structures/Event.js");


// const connection = require("../Classes/database.js");


module.exports = new Event("ready", client => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity("Doing the BIG testing");
});